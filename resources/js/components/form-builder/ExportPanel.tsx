import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormStore } from '@/store/formStore';
import { Button } from '../ui/button';
import { Download, FileJson, Code } from 'lucide-react';
import { Textarea } from '../ui/textarea';

export function ExportPanel() {
    const { exportSchema, exportReactComponent, regenerateFieldIds } =
        useFormStore();
    const [exportType, setExportType] = useState<'schema' | 'component'>(
        'schema',
    );
    const [exportContent, setExportContent] = useState('');

    const handleExport = () => {
        if (exportType === 'schema') {
            const schema = exportSchema();
            setExportContent(JSON.stringify(schema, null, 2));
        } else {
            const component = exportReactComponent();
            setExportContent(component);
        }
    };

    const downloadFile = () => {
        const filename =
            exportType === 'schema' ? 'form-schema.json' : 'FormComponent.tsx';
        const blob = new Blob([exportContent], {
            type:
                exportType === 'schema'
                    ? 'application/json'
                    : 'text/javascript',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Card className="w-80">
            <CardHeader>
                <CardTitle className="text-lg">Export Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex space-x-2">
                    <Button
                        variant={
                            exportType === 'schema' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setExportType('schema')}
                        className="flex-1"
                    >
                        <FileJson className="mr-2 h-4 w-4" />
                        JSON Schema
                    </Button>
                    <Button
                        variant={
                            exportType === 'component' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setExportType('component')}
                        className="flex-1"
                    >
                        <Code className="mr-2 h-4 w-4" />
                        React Component
                    </Button>
                </div>

                <Button
                    onClick={regenerateFieldIds}
                    variant="outline"
                    className="w-full"
                >
                    Fix Field IDs
                </Button>

                <Button onClick={handleExport} className="w-full">
                    Generate {exportType === 'schema' ? 'Schema' : 'Component'}
                </Button>

                {exportContent && (
                    <>
                        <Textarea
                            value={exportContent}
                            readOnly
                            className="h-64 font-mono text-xs"
                            placeholder="Export content will appear here..."
                        />
                        <Button
                            onClick={downloadFile}
                            className="w-full"
                            variant="outline"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download File
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
