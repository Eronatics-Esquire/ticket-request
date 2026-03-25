import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Key } from 'lucide-react';

const VALID_KEYS = [
  'FC-PREM-A1B2C3D4',
  'FC-PREM-E5F6G7H8',
  'FC-PREM-X9Y8Z7W6',
  'FC-PREM-M3N4O5P6',
  'FC-PREM-Q1R2S3T4'
];

export function LicenseKeyInput() {
  const [key, setKey] = useState('');
  const [isActivated, setIsActivated] = useState(() => {
    return localStorage.getItem('formcraft-premium') === 'activated';
  });
  const [error, setError] = useState('');

  const activateLicense = () => {
    if (VALID_KEYS.includes(key.toUpperCase())) {
      localStorage.setItem('formcraft-premium', 'activated');
      localStorage.setItem('formcraft-license-key', key.toUpperCase());
      setIsActivated(true);
      setError('');
    } else {
      setError('Invalid license key. Please check and try again.');
    }
  };

  if (isActivated) {
    return (
      <Card className="w-64 border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Premium Activated</span>
          </div>
          <p className="text-sm text-green-600 mt-2">
            All premium templates unlocked!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Key className="w-4 h-4" />
          <span>Activate Premium</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="license-key">License Key</Label>
          <Input
            id="license-key"
            placeholder="FC-PREM-XXXXXXXX"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="mt-1"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <Button onClick={activateLicense} className="w-full">
          Activate License
        </Button>
        <div className="text-center">
          <a
            href="https://shoaeeb.gumroad.com/l/formcraft-premium"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Don't have a license? Buy Premium →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}