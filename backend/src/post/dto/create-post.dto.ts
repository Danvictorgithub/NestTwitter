import { Length } from "class-validator";

export class CreatePostDto {
    @Length(1,280)
    content:string;

    image:string;

}
