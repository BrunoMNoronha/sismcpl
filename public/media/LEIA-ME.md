# Arquivos de Mídia — SisMCPL

Esta pasta está preparada para receber os arquivos de mídia da landing page.

## Arquivos esperados:

### Vídeo
- **Arquivo:** `Impacto_do_SisMCPL.mp4`
- **Uso:** Seção "Por que usar o SisMCPL?" na landing page
- **Formato recomendado:** MP4, resolução mínima 720p

### Áudio
- **Arquivo:** `Tecnologia_para_unir_produtores_e_mercados_locais.m4a`
- **Uso:** Player de áudio na landing page
- **Formato:** M4A (também aceita MP3)

## Instruções:
1. Copie os arquivos para esta pasta (`public/media/`)
2. Edite o arquivo `src/app/page.tsx` para descomentar as tags de vídeo e áudio
3. Reinicie o servidor de desenvolvimento

## Como integrar o vídeo:
```tsx
<video controls className="w-full rounded-xl">
  <source src="/media/Impacto_do_SisMCPL.mp4" type="video/mp4" />
</video>
```

## Como integrar o áudio:
```tsx
<audio controls className="w-full">
  <source src="/media/Tecnologia_para_unir_produtores_e_mercados_locais.m4a" type="audio/mp4" />
</audio>
```
