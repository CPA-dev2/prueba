# Sistema de Fallback para URLs del Servidor

## Descripción

Se ha implementado un sistema de fallback automático que permite a la aplicación intentar conectarse primero al servidor VPN y, si falla, automáticamente cambiar al servidor original como respaldo.

## URLs Configuradas

- **Servidor Principal (VPN)**: `https://vpnprendacredito.ciancoders.com/api`
- **Servidor de Fallback**: `https://app.corporacionavanza.com/api`

## Funcionamiento

### Comportamiento Automático

1. **Primer intento**: La aplicación siempre intenta conectarse al servidor VPN principal
2. **Detección de fallo**: Si hay un error de conectividad (errores de red o códigos 5xx), automáticamente cambia al servidor de fallback
3. **Reintentos**: Después de cambiar al fallback, reintenta la misma operación
4. **Recuperación automática**: Si una petición es exitosa después de usar el fallback, la aplicación intenta volver al servidor principal para la siguiente petición

### Archivos Modificados

#### `src/utils/api.js`
- Funciones principales modificadas: `get`, `post`, `put`, `eliminar`, `postAttachments`, `postImagenes`
- Nuevas funciones auxiliares:
  - `executeWithFallback()`: Maneja la lógica de retry automático
  - `switchToFallback()`: Cambia al servidor de fallback
  - `resetToPrimary()`: Vuelve al servidor principal
  - `isConnectionError()`: Detecta errores de conectividad

#### `src/utils/variables.js`
- Misma lógica de fallback para `URL_BASE`
- Funciones exportadas:
  - `switchUrlToFallback()`
  - `resetUrlToPrimary()`
  - `isUsingFallbackUrl()`

## Uso Manual (Opcional)

Si necesitas controlar manualmente el servidor a usar:

```javascript
import { switchToFallback, resetToPrimary } from '../utils/api';

// Cambiar manualmente al servidor de fallback
switchToFallback();

// Volver manualmente al servidor principal
resetToPrimary();
```

## Consideraciones

- **Solo en producción**: El sistema de fallback solo funciona cuando `__DEV__ !== true`
- **Logs**: Se registran en consola los cambios de servidor para debugging
- **Transparente**: El sistema es completamente transparente para el código existente
- **Sin cambios en API**: No se requieren modificaciones en el código que usa las funciones de API

## Tipos de Errores que Activan el Fallback

- Errores de red (sin respuesta del servidor)
- Códigos de estado HTTP 5xx (errores del servidor)
- Timeouts de conexión
- Cualquier error que indique problemas de conectividad con el servidor principal

## Testing

Para probar el sistema:

1. Desconecta la VPN o bloquea acceso a `vpnprendacredito.ciancoders.com`
2. Realiza cualquier operación que haga una petición al servidor
3. Observa los logs en consola para ver el cambio automático al servidor de fallback
4. Reconecta la VPN y observa cómo vuelve automáticamente al servidor principal
