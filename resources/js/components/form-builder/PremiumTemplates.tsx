import { useFormStore } from '@/store/formStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FormSchema } from '@/types';
import { generateId } from '@/lib/utils';
import { Lock, FileText, Building, Heart, Briefcase, Scale } from 'lucide-react';

const premiumTemplates: Array<{
  name: string;
  icon: React.ReactNode;
  category: string;
  schema: Omit<FormSchema, 'id'>
}> = [
  {
    name: 'Legal Contract',
    icon: <Scale className="w-4 h-4" />,
    category: 'Legal',
    schema: {
      title: 'Service Agreement Contract',
      description: 'Professional service contract form',
      fields: [
        { id: generateId(), type: 'text', label: 'Client Company Name', required: true },
        { id: generateId(), type: 'text', label: 'Client Contact Person', required: true },
        { id: generateId(), type: 'email', label: 'Client Email', required: true },
        { id: generateId(), type: 'date', label: 'Contract Start Date', required: true },
        { id: generateId(), type: 'date', label: 'Contract End Date', required: true },
        { id: generateId(), type: 'select', label: 'Service Type', required: true, options: ['Consulting', 'Development', 'Design', 'Marketing', 'Other'] },
        { id: generateId(), type: 'number', label: 'Contract Value ($)', required: true },
        { id: generateId(), type: 'textarea', label: 'Scope of Work', required: true },
        { id: generateId(), type: 'checkbox', label: 'I agree to the terms and conditions', required: true }
      ]
    }
  },
  {
    name: 'Medical Intake',
    icon: <Heart className="w-4 h-4" />,
    category: 'Medical',
    schema: {
      title: 'Patient Intake Form',
      description: 'New patient registration and medical history',
      fields: [
        { id: generateId(), type: 'text', label: 'Patient Full Name', required: true },
        { id: generateId(), type: 'date', label: 'Date of Birth', required: true },
        { id: generateId(), type: 'select', label: 'Gender', required: true, options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
        { id: generateId(), type: 'tel', label: 'Phone Number', required: true },
        { id: generateId(), type: 'email', label: 'Email Address', required: true },
        { id: generateId(), type: 'textarea', label: 'Current Medications', required: false },
        { id: generateId(), type: 'textarea', label: 'Known Allergies', required: false },
        { id: generateId(), type: 'textarea', label: 'Medical History', required: false },
        { id: generateId(), type: 'text', label: 'Emergency Contact Name', required: true },
        { id: generateId(), type: 'tel', label: 'Emergency Contact Phone', required: true }
      ]
    }
  },
  {
    name: 'Property Listing',
    icon: <Building className="w-4 h-4" />,
    category: 'Real Estate',
    schema: {
      title: 'Property Listing Application',
      description: 'List your property for sale or rent',
      fields: [
        { id: generateId(), type: 'text', label: 'Property Address', required: true },
        { id: generateId(), type: 'select', label: 'Property Type', required: true, options: ['House', 'Apartment', 'Condo', 'Townhouse', 'Commercial'] },
        { id: generateId(), type: 'number', label: 'Bedrooms', required: true },
        { id: generateId(), type: 'number', label: 'Bathrooms', required: true },
        { id: generateId(), type: 'number', label: 'Square Footage', required: true },
        { id: generateId(), type: 'number', label: 'Asking Price ($)', required: true },
        { id: generateId(), type: 'select', label: 'Listing Type', required: true, options: ['For Sale', 'For Rent', 'For Lease'] },
        { id: generateId(), type: 'textarea', label: 'Property Description', required: true },
        { id: generateId(), type: 'text', label: 'Owner Name', required: true },
        { id: generateId(), type: 'tel', label: 'Owner Phone', required: true }
      ]
    }
  },
  {
    name: 'Job Application',
    icon: <Briefcase className="w-4 h-4" />,
    category: 'HR',
    schema: {
      title: 'Employment Application',
      description: 'Apply for a position at our company',
      fields: [
        { id: generateId(), type: 'text', label: 'Full Name', required: true },
        { id: generateId(), type: 'email', label: 'Email Address', required: true },
        { id: generateId(), type: 'tel', label: 'Phone Number', required: true },
        { id: generateId(), type: 'text', label: 'Position Applied For', required: true },
        { id: generateId(), type: 'select', label: 'Employment Type', required: true, options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
        { id: generateId(), type: 'date', label: 'Available Start Date', required: true },
        { id: generateId(), type: 'number', label: 'Expected Salary ($)', required: false },
        { id: generateId(), type: 'textarea', label: 'Previous Work Experience', required: true },
        { id: generateId(), type: 'textarea', label: 'Education Background', required: true },
        { id: generateId(), type: 'textarea', label: 'Why do you want this job?', required: true }
      ]
    }
  },
  {
    name: 'Event Planning',
    icon: <FileText className="w-4 h-4" />,
    category: 'Events',
    schema: {
      title: 'Event Planning Request',
      description: 'Plan your perfect event with us',
      fields: [
        { id: generateId(), type: 'text', label: 'Event Name', required: true },
        { id: generateId(), type: 'select', label: 'Event Type', required: true, options: ['Wedding', 'Corporate', 'Birthday', 'Conference', 'Other'] },
        { id: generateId(), type: 'date', label: 'Event Date', required: true },
        { id: generateId(), type: 'number', label: 'Expected Guests', required: true },
        { id: generateId(), type: 'text', label: 'Venue Preference', required: false },
        { id: generateId(), type: 'number', label: 'Budget Range ($)', required: true },
        { id: generateId(), type: 'textarea', label: 'Special Requirements', required: false },
        { id: generateId(), type: 'text', label: 'Contact Person', required: true },
        { id: generateId(), type: 'email', label: 'Contact Email', required: true },
        { id: generateId(), type: 'tel', label: 'Contact Phone', required: true }
      ]
    }
  }
];

export function PremiumTemplates() {
  const { loadTemplate } = useFormStore();
  const isPremium = localStorage.getItem('formcraft-premium') === 'activated';

  const handleTemplateClick = (template: typeof premiumTemplates[0]) => {
    if (isPremium) {
      loadTemplate(template.schema);
    }
  };

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Lock className="w-4 h-4 text-amber-500" />
          <span>Premium Templates</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {premiumTemplates.map((template) => (
          <div key={template.name} className="relative">
            <Button
              variant="outline"
              className={`w-full justify-start h-auto p-3 ${
                !isPremium ? 'opacity-60' : ''
              }`}
              onClick={() => handleTemplateClick(template)}
              disabled={!isPremium}
            >
              <div className="flex items-center space-x-2 w-full">
                {template.icon}
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {template.category} • {template.schema.fields.length} fields
                  </div>
                </div>
                {!isPremium && <Lock className="w-3 h-3 text-amber-500" />}
              </div>
            </Button>
          </div>
        ))}

        {!isPremium && (
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800 mb-2">
              Unlock 20+ premium templates
            </p>
            <Button
              size="sm"
              className="w-full bg-amber-600 hover:bg-amber-700"
              onClick={() => window.open('https://shoaeeb.gumroad.com/l/formcraft-premium', '_blank')}
            >
              Buy Premium - $9.99
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}