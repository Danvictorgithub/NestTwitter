import { HttpException, Injectable, InternalServerErrorException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';


@Injectable()
export class SupabaseService implements OnModuleInit {
    private supabaseUrl = process.env.SUPABASE_URL;
    private supabaseKey = process.env.SUPABASE_KEY;
    private supabase:SupabaseClient = createClient(this.supabaseUrl,this.supabaseKey);
    async onModuleInit() {
        console.log("Supabase is successfully initialized")     
    }
    async uploadFile(file) {
        const {data,error} = await this.supabase.storage
            .from('Images')
            .upload(`${file.fieldname}/${randomUUID()}.${file.originalname.split('.').pop()}`,file.buffer,{contentType:file.mimetype});
        if (error) {
            throw new UnprocessableEntityException(error);
        }
        const link = await this.supabase.storage.from('Images').getPublicUrl(data.path).data.publicUrl;
        return link;
    }
}

