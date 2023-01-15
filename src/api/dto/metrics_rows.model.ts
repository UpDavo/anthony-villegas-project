export interface ResponseValidation {
  response: validator1;
  validation: validator2;
}

interface MetricsRows {
  id: string;
  name: string;
  tribe: string;
  organization: string;
  coverage: string;
  codesmells: string;
  bugs: string;
  vulnerabilities: string;
  hotspot: string;
  verificationState: string;
  state: string;
}

interface validator1 {
  repositories: MetricsRows[];
}

interface validator2 {
  error: boolean;
  description: string;
}
