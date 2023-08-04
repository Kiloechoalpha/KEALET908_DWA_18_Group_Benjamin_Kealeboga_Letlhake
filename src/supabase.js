import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://ustdfjuxtqkretdraqks.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzdGRmanV4dHFrcmV0ZHJhcWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwNjM2MTksImV4cCI6MjAwNjYzOTYxOX0.dT8fa1-A80TOC8Afo1rwseZ5h3QXrcnqyHpDmFBxS_I'; 

const supabase = createClient(supabaseUrl, supabaseKey);

export {supabase};
