import { useFormStore } from '@/store/formStore';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';

import { FieldEditor } from '@/components/form-builder/FieldEditor';
import { FieldPalette } from '@/components/form-builder/FieldPalette';
import { FormCanvas } from '@/components/form-builder/FormCanvas';
import { FormPreview } from '@/components/form-builder/FormPreview';
import { FormTemplates } from '@/components/form-builder/FormTemplates';
import { PremiumTemplates } from '@/components/form-builder/PremiumTemplates';
import AppLayout from '@/layouts/app-layout';
import { generateId } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, FormField } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Form Builder',
        href: dashboard(),
    },
];

export default function Dashboard() {
    const { addField, reorderFields } = useFormStore();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [draggedField, setDraggedField] = useState<FormField | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);

        if (event.active.data.current?.type === 'field') {
            const fieldType = event.active.data.current.fieldType;
            setDraggedField({
                id: generateId(),
                type: fieldType,
                label: `New ${fieldType} field`,
                required: false,
                ...(fieldType === 'select' || fieldType === 'radio'
                    ? { options: ['Option 1', 'Option 2'] }
                    : {}),
            });
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        // Handle dragging from palette to canvas
        if (
            active.data.current?.type === 'field' &&
            over.id === 'form-canvas'
        ) {
            // This is handled in dragEnd
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            setDraggedField(null);
            return;
        }

        // Handle dropping from palette to canvas
        if (
            active.data.current?.type === 'field' &&
            over.id === 'form-canvas'
        ) {
            if (draggedField) {
                addField(draggedField);
            }
        }

        // Handle reordering within canvas
        if (active.id !== over.id && !active.data.current?.type) {
            reorderFields(active.id as string, over.id as string);
        }

        setActiveId(null);
        setDraggedField(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Form Builder" />
            <div className="min-h-screen bg-background">
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="mx-auto p-4">
                        <div className="flex gap-4">
                            <div className="space-y-4">
                                <FieldPalette />
                                <FormTemplates />
                                <PremiumTemplates />
                                {/* <MultiStepControls /> */}
                            </div>
                            <FormCanvas />
                            <div className="flex h-fit gap-4">
                                <div>
                                    <FormPreview />
                                </div>
                                <div>
                                    <FieldEditor />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DragOverlay>
                        {activeId && draggedField ? (
                            <div className="rounded-lg border bg-card p-4 shadow-lg">
                                <div className="font-medium">
                                    {draggedField.label}
                                </div>
                                <div className="text-sm text-muted-foreground capitalize">
                                    {draggedField.type} field
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </AppLayout>
    );
}
