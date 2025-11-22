# Proyecto1
Proyecto Diego, Adela y Leonardo

Objetivo del Sistema
El objetivo de este sistema es proporcionar a los usuarios una plataforma para [describe el propósito principal, por ejemplo: consultar tasas de cambio de moneda en tiempo real, gestionar inventarios, visualizar precios de productos actualizados, etc.].
La aplicación consume una API externa para obtener datos actualizados y brinda una experiencia de usuario fluida e intuitiva.
Funcionalidades Implementadas
•	Consulta en tiempo real de [por ejemplo: tasas de cambio de monedas].
•	Conversión automática de valores a diferentes monedas.
•	Interfaz de usuario amigable y responsive.
•	Histórico de consultas recientes.
•	Soporte para múltiples idiomas (si aplica).
•	Manejo de errores en caso de problemas con la API externa.
Instrucciones para Instalar y Ejecutar el Proyecto
Requisitos Previos
•	Node.js >= 18.x
•	npm >= 9.x (o yarn >= 1.22)
•	Git (opcional)
Pasos de Instalación
1.	Clonar el repositorio:
bash
CopiarEditar
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
2.	Instalar dependencias:
bash
CopiarEditar
npm install
# o si usas yarn
yarn install
3.	Configurar variables de entorno (si aplica):
Crea un archivo .env en la raíz del proyecto con las siguientes variables:
ini
CopiarEditar
API_KEY=tu_api_key
API_URL=https://api.ejemplo.com/v1
4.	Ejecutar el proyecto en modo desarrollo:
bash
CopiarEditar
npm run dev
# o
yarn dev
5.	Construir para producción (opcional):
bash
CopiarEditar
npm run build
npm start
Detalles de la API Externa Utilizada
•	Nombre de la API: [ExchangeRate-API / Fixer.io / API personalizada, etc.]
•	URL base: https://api.ejemplo.com/v1
•	Documentación oficial: https://api.ejemplo.com/docs
•	Tipo de autenticación: API Key en header o query param.
•	Endpoints principales:
o	GET /convertir → Obtiene tasas de cambio más recientes.
o	GET /convertir/:moneda → Consulta de tasas históricas.
•	Ejemplo de respuesta:
json
CopiarEditar
{
  "base": "USD",
  "date": "2025-06-22",
  "rates": {
    "EUR": 0.85,
    "HNL": 24.5,
    "GBP": 0.75
  }
}

