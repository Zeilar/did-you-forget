import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import Mailjet, { type LibraryResponse } from "node-mailjet";
import { ConfigService } from "@nestjs/config";
import type { RequestData } from "node-mailjet/declarations/request/Request";

@Injectable()
export class MailjetService implements OnModuleInit {
  private mailjet: Mailjet;

  public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  public onModuleInit(): void {
    console.log("HERE", this.configService.get("mailjet.keys.api"));
    console.log(this.configService.getOrThrow("mailjet.keys.api"));
    this.mailjet = new Mailjet({
      apiKey: this.configService.getOrThrow("mailjet.keys.api"),
      apiSecret: this.configService.getOrThrow("mailjet.keys.secret"),
    });
  }

  public sendMail(
    { email, name }: { email: string; name: string },
    subject: string,
    html: string
  ): Promise<LibraryResponse<RequestData>> {
    return this.mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: this.configService.getOrThrow("mailjet.sender.email"),
            Name: this.configService.getOrThrow("mailjet.sender.name"),
          },
          To: [{ Email: email, Name: name }],
          Subject: subject,
          HTMLPart: html,
        },
      ],
    });
  }
}
