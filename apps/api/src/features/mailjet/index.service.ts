import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import Mailjet, { type LibraryResponse } from "node-mailjet";
import { ConfigService } from "@nestjs/config";
import type { RequestData } from "node-mailjet/declarations/request/Request";

@Injectable()
export class MailjetService implements OnModuleInit {
  private mailjet: Mailjet;

  public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  public onModuleInit(): void {
    this.mailjet = new Mailjet({
      apiKey: this.configService.get("mailjet.keys.api"),
      apiSecret: this.configService.get("mailjet.keys.secret"),
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
            Email: this.configService.get("mailjet.sender.email"),
            Name: this.configService.get("mailjet.sender.name"),
          },
          To: [{ Email: email, Name: name }],
          Subject: subject,
          HTMLPart: html,
        },
      ],
    });
  }
}
