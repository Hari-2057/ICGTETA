export function getPatientSessionId() {
  if (typeof window === 'undefined') return 'session_default';
  
  let sessionId = localStorage.getItem('cdss_patient_session_id');
  if (!sessionId) {
    sessionId = `patient_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('cdss_patient_session_id', sessionId);
  }
  return sessionId;
}
