export interface ABHAUser {
  abha_id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  created_at: string;
}

export interface ABHALogin {
  abha_id: string;
  phone: string;
}

export interface ABHALoginResponse {
  message: string;
  abha_user?: ABHAUser;
  access_token?: string;
}

export interface CodeSystemConcept {
  code: string;
  display: string;
  definition?: string;
}

export interface CodeSystemResponse {
  resourceType: string;
  concepts: CodeSystemConcept[];
}

export interface ConceptMapMapping {
  source_code: string;
  target_code: string;
  relationship: string;
  snomed_ct_code: string;
  loinc_code: string;
}

export interface ConceptMapResponse {
  resourceType: string;
  id: string;
  name: string;
  mappings: ConceptMapMapping[];
}

export interface TranslationHistoryEntry {
  id: number;
  abha_id: string;
  source_system: string;
  source_code: string;
  target_system: string;
  target_code: string;
  snomed_ct_code: string;
  loinc_code: string;
  timestamp: string;
}

export interface TranslationHistoryResponse {
  history: TranslationHistoryEntry[];
}