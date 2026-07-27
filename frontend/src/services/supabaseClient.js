import { createClient } from '@supabase/supabase-js';
import { getPatientSessionId } from '../utils/session';

// User's Supabase Key
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "sb_publishable_LkPBGMkAOATPB2qUxBz0cA_2egzKInV";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";

let supabase = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  } catch (e) {
    console.warn("Supabase init error:", e);
  }
}

export async function savePredictionToSupabase(labData, prediction) {
  if (!supabase) return null;

  const sessionId = getPatientSessionId();
  const reportId = `CDSS_Report_${Date.now()}`;

  const row = {
    id: reportId,
    patient_session_id: sessionId,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    patient_age: Number(labData.age) || 45,
    patient_gender: labData.gender || 'Female',
    hba1c: Number(labData.hba1c) || 5.8,
    fasting_glucose: Number(labData.fasting_glucose) || 105.0,
    random_glucose: Number(labData.random_glucose) || 140.0,
    predicted_class: prediction.predicted_class,
    confidence_score: prediction.confidence_score,
    severity_index: prediction.severity_index,
    storage_provider: 'Supabase Cloud Realtime'
  };

  try {
    const { data, error } = await supabase
      .from('patient_reports')
      .insert([row]);

    if (error) {
      console.error('[Supabase Insert Error]:', error);
      return null;
    }

    console.log('[Supabase] Successfully saved record to patient_reports:', row);
    return row;
  } catch (err) {
    console.error('[Supabase Error]:', err);
    return null;
  }
}

export async function fetchSessionReportsFromSupabase(sessionId = getPatientSessionId()) {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('patient_reports')
      .select('*')
      .eq('patient_session_id', sessionId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase Fetch Error]:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('[Supabase Fetch Exception]:', err);
    return [];
  }
}
