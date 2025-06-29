# 📚 Gestor de Libros Electronicos

**Grupo:** Vanessa Paspuel  
**Fecha:** 28-06-2025  
**Objetivo:** Desarrollar un sistema integral de gestión de préstamos de libros, con funcionalidades para autenticación de usuarios, registro de libros, gestión de préstamos y devoluciones.

---

## ✨ Funcionalidades Principales

El sistema está estructurado de forma modular, permitiendo la integración y escalabilidad de nuevos componentes. Actualmente incluye:

- 🔐 **Gestión de Usuarios**
  - Registro de nuevos usuarios
  - Sistema de login y autenticación
- 📖 **Gestión de Libros**
  - Registro, edición y listado de libros
- 📅 **Gestión de Préstamos**
  - Asignación de libros a usuarios
  - Registro de fechas de préstamo y devolución

---

## 🧩 Arquitectura Frontend

El frontend está construido con una arquitectura basada en componentes reutilizables que favorece el mantenimiento y escalabilidad del sistema.

### Componentes destacados:

- **NavBar:** Barra de navegación principal para acceso a las secciones del sistema.
- **Modales Reutilizables:** Utilizados para operaciones como creación de usuarios, libros y préstamos.

---

## 🛠️ Stack Tecnológico

### Frontend:
- **Next.js** – Framework para aplicaciones React con renderizado híbrido.
- **React.js** – Librería para la construcción de interfaces de usuario.
- **TypeScript** – Superset de JavaScript para desarrollo tipado y robusto.
- **Tailwind CSS** – Framework de utilidades para estilos modernos y responsivos.
- **Material UI (MUI)** – Librería de componentes visuales accesibles y personalizables.

### Backend:
- **Go (Golang)** – Lenguaje principal para los servicios web del backend.
- **Gin Gonic** – Framework HTTP rápido y minimalista para la creación de APIs RESTful.
- **MySQL** – Sistema de gestión de bases de datos relacional para almacenamiento estructurado.

---

## 🏗️ Arquitectura General

- La aplicación se basa en una arquitectura de **microservicios** para el backend, escritos en Go.
- Cada servicio (usuarios, libros, préstamos) está desacoplado y se comunica vía HTTP.
- El frontend interactúa con los servicios mediante llamadas a APIs REST.
- La base de datos MySQL centraliza el almacenamiento, con tablas relacionalmente normalizadas y consultas optimizadas.

---

## 🚀 Próximas Mejoras

- Historial de préstamos por usuario.
- Notificaciones automáticas de devolución pendiente.
- Dashboard con estadísticas de préstamos y libros más populares.