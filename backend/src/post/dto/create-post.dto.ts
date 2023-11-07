import { Length } from "class-validator";

export class CreatePostDto {
    @Length(0,280)
    content:string;

    image:string;

}
