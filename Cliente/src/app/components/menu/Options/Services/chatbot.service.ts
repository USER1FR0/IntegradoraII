import { DOCUMENT } from '@angular/common';
import { Inject, Renderer2, RendererFactory2, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbaseService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadChatbot() {
    // Elimina cualquier script existente de Chatbase para evitar duplicados
    const existingScript = this.document.getElementById('chatbase-script');
    if (existingScript) {
      this.renderer.removeChild(this.document.head, existingScript);
    }

    // Configura el objeto de configuración del chatbot
    const configScript = this.renderer.createElement('script');
    configScript.type = 'text/javascript';
    configScript.text = `
      window.embeddedChatbotConfig = {
        chatbotId: "a84_C03oGnn36XdiArSXc",
        domain: "www.chatbase.co"
      };
    `;
    this.renderer.appendChild(this.document.head, configScript);

    // Carga el script del chatbot y añade un ID único para futuras referencias
    const chatbotScript = this.renderer.createElement('script');
    chatbotScript.id = 'chatbase-script';
    chatbotScript.src = 'https://www.chatbase.co/embed.min.js';
    chatbotScript.setAttribute('chatbotId', 'a84_C03oGnn36XdiArSXc');
    chatbotScript.setAttribute('domain', 'www.chatbase.co');
    chatbotScript.defer = true;
    this.renderer.appendChild(this.document.head, chatbotScript);
  }
}
