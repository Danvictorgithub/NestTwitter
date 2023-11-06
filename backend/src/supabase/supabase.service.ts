import { Injectable, OnModuleInit } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
    private supabaseUrl = process.env.SUPABASE_URL;
    private supabaseKey = process.env.SUPABASE_KEY; 
    private supabase:SupabaseClient = createClient(this.supabaseUrl,this.supabaseKey);
    async onModuleInit() {
        console.log("Supabase is successfully initialized")     
    }
}

