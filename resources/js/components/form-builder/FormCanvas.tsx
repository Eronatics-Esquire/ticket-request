import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFormStore } from '@/store/formStore';
import { SortableField } from './SortableField';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';

export function FormCanvas() {
    const { schema, updateSchema, currentStep } = useFormStore();
    const { setNodeRef } = useDroppable({ id: 'form-canvas' });

    // Get current fields based on mode
    const currentFields =
        schema.isMultiStep && schema.steps
            ? schema.steps[currentStep]?.fields || []
            : schema.fields;

    const handleCreateForm = () => {
        console.log(currentFields);
    };

    return (
        <div className="flex-1 p-4">
            <Card>
                <CardHeader>
                    <div className="space-y-2">
                        <Label htmlFor="form-title">Form Title</Label>
                        <Input
                            id="form-title"
                            value={schema.title}
                            onChange={(e) =>
                                updateSchema({ title: e.target.value })
                            }
                            className="text-xl font-semibold"
                        />
                        <Label htmlFor="form-description">
                            Description (optional)
                        </Label>
                        <Input
                            id="form-description"
                            value={schema.description || ''}
                            onChange={(e) =>
                                updateSchema({ description: e.target.value })
                            }
                            placeholder="Add a description for your form"
                        />
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div
                        ref={setNodeRef}
                        className="space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4"
                        style={{
                            minHeight:
                                currentFields.length === 0
                                    ? '400px'
                                    : `${Math.max(400, currentFields.length * 150 + 300)}px`,
                        }}
                    >
                        {currentFields.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground">
                                <p>
                                    Drag fields from the palette to build your{' '}
                                    {schema.isMultiStep
                                        ? `step ${currentStep + 1}`
                                        : 'form'}
                                </p>
                            </div>
                        ) : (
                            <SortableContext
                                items={currentFields.map((f) => f.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {currentFields.map((field) => (
                                    <SortableField
                                        key={field.id}
                                        field={field}
                                    />
                                ))}
                            </SortableContext>
                        )}
                    </div>
                    <Button onClick={handleCreateForm}>Create</Button>
                </CardContent>
            </Card>
        </div>
    );
}
