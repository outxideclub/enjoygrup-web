# Panel de administración (`/admin`)

Panel para editar el contenido de la web sin tocar código. Acceso en
[`/admin`](https://www.grupoenjoy.es/admin) con la contraseña del panel.

## Secciones

| Sección | Qué edita | Archivo de datos |
|---|---|---|
| **Carta** | Cartas de Enjoy (cocktails/shisha) y Hiru | `data/menus/*.json` |
| **Galería** | Fotos por local (subida incluida) | `data/gallery/*.json` |
| **Locales** | Hero, descripción, horario, dirección de cada local | `data/venues/*.json` |
| **Contacto** | Teléfonos, WhatsApp, emails y redes sociales | `data/site/contact.json` |
| **Legal** | Textos legales (aviso, privacidad, cookies…) | `data/legal/*.json` |

## Cómo se guardan los cambios

En Vercel el sistema de archivos es de **solo lectura**, así que al pulsar
**Guardar** el panel hace un **commit a GitHub** del archivo de datos
correspondiente. Vercel detecta el commit y **redespliega automáticamente**, por
lo que el cambio aparece en la web en **~1-2 minutos** (lo que tarda el deploy).

En desarrollo local (sin `GITHUB_TOKEN`) los cambios se escriben directamente en
disco para iteración instantánea.

## Variables de entorno requeridas

Configúralas en **Vercel → Project → Settings → Environment Variables** (y en
`.env.local` para desarrollo):

```bash
# Login del panel
ADMIN_PASSWORD=            # contraseña de acceso a /admin
ADMIN_SESSION_SECRET=      # secreto para firmar la cookie (openssl rand -hex 32)

# Persistencia vía GitHub (solo producción)
GITHUB_TOKEN=              # PAT fine-grained con "Contents: Read and write" en el repo
GITHUB_REPO=outxideclub/enjoygrup-web
GITHUB_BRANCH=main
```

### Crear el `GITHUB_TOKEN`

1. GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate new token.
2. **Repository access**: Only select repositories → `outxideclub/enjoygrup-web`.
3. **Permissions** → Repository permissions → **Contents: Read and write**.
4. Genera el token y pégalo en `GITHUB_TOKEN` en Vercel.

> El token solo se usa en el servidor (nunca se expone al navegador). Si caduca o
> se revoca, el panel dejará de poder guardar hasta que lo renueves.
