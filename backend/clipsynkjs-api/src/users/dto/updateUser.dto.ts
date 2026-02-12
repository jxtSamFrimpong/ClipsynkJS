import { PartialType } from "@nestjs/mapped-types";
import { CreateUserdto } from "./create-user.dto";


export class UpdateUserdto extends PartialType(CreateUserdto) {}