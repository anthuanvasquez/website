---
title: 12 Comandos de Git que Debes Conocer
date: 2026-10-18
description: Doce comandos de Git que todo desarrollador debería conocer para trabajar de manera eficiente.
image: /images/blog/git-commands.jpg
alt: 12 Comandos de Git que Debes Conocer
duration: 5 min read
tags: ['git', 'terminal']
published: true
---

# 12 Comandos de Git que Debes Conocer

Cualquier desarrollador que trabaje en equipo o en proyectos personales se da cuenta rápido de que, aunque Git tiene cientos de comandos, en el día a día terminas usando siempre los mismos doce. No necesitas aprenderte el manual completo para sobrevivir a un lunes de despliegues. Con dominar este grupo básico puedes resolver el noventa por ciento de las situaciones reales.

### 1. `git cherry-pick`

A que no te lo esperabas, [git cherry-pick](https://git-scm.com/docs/git-cherry-pick) es el comando que te permite aplicar cambios de un commit específico en tu rama actual. Es útil cuando quieres traer una corrección puntual sin fusionar toda la rama de origen.

Creeme, en un entorno de producción serio, este es por mucho uno de los comandos más usado por los desarrolladores experimentados. Y es que no siempre un feature se mezcla de inmediato y siempre hay que aplicar correcciones puntuales de manera selectiva.

### 2. `git status`

[git status](https://git-scm.com/docs/git-status) es el comando que más vas a teclear durante el día, de hecho los agentes de IA también lo usan para entender el estado del proyecto. Te muestra exactamente en qué estado está tu directorio de trabajo. Qué archivos has modificado, cuáles están listos para entrar al próximo commit y cuáles ni se han tocado. Lo ideal es usarlo antes de hacer cualquier movimiento para no llevarnos sorpresas.

```bash
git status

```

### 3. `git add`

Una vez que modificas o creas archivos, necesitas preparar esos cambios para guardarlos. Con [git add](https://git-scm.com/docs/git-add) le dices a Git qué archivos específicos quieres incluir en la próxima foto del proyecto. Puedes agregar un archivo en concreto o usar un punto para llevártelo todo de golpe.

```bash
git add archivo.txt
git add .
```

### 4. `git commit`

[git commit](https://git-scm.com/docs/git-commit) guarda formalmente los cambios preparados en el historial local. La clave aquí es escribir mensajes claros y directos que expliquen qué hiciste y por qué. Un buen mensaje de commit le ahorra dolores de cabeza a quien revise el código después, incluido tu futuro yo.

Escribir buenos commits es todo un arte y una práctica que mejora la colaboración y el mantenimiento del código a largo plazo.

Actualmente los agentes de IA son los que están escribiendo gran parte de los mensajes de commit, ayudando a los desarrolladores a mantener un historial claro y consistente.

```bash
git commit -m "feat(scope): descripción del cambio"
git commit -m "feat(scope): descripción del cambio" -m "Descripción más detallada"
```

### 5. `git push`

Sirve para subir tus commits locales al repositorio remoto, ya sea GitHub, GitLab o cualquier otro servidor. [git push](https://git-scm.com/docs/git-push) es la forma de compartir tu trabajo con el resto del equipo o simplemente dejar una copia de seguridad en la nube.

```bash
git push origin main
```

### 6. `git pull`

El proceso inverso al anterior [git pull](https://git-scm.com/docs/git-pull). Antes de empezar a picar código o cuando vas a mandar tus cambios, necesitas traerte lo que otros, incluido agentes de IA, hayan subido al repositorio remoto. Este comando descarga y fusiona esas novedades en tu rama actual de un solo golpe.

```bash
git pull # en tu rama actual
git pull origin main
```

### 7. `git clone`

Lo usas una sola vez por cada proyecto nuevo. [git clone](https://git-scm.com/docs/git-clone) te permite descargar una copia completa de un repositorio existente en tu máquina para empezar a trabajar de inmediato. Copia todo el historial y todas las ramas.

```bash
git clone <URL_DEL_REPOSITORIO>
git clone <URL_DEL_REPOSITORIO> --depth 1 # clona solo el historial más reciente
```

### 8. `git branch`

Las ramas son la base para trabajar en paralelo sin romper el código principal. [git branch](https://git-scm.com/docs/git-branch) te permite listar las ramas que existen, crear una nueva para tu próxima tarea o borrar las que ya no sirven. Saber en qué rama estás parado evita que metas código experimental donde no debe ir.

```bash
git branch
git branch nueva-rama
git branch -d rama-antigua
```

### 9. `git checkout` o `git switch`

Con [git checkout](https://git-scm.com/docs/git-checkout) y [git switch](https://git-scm.com/docs/git-switch) te mueves entre ramas o regresas a versiones anteriores de un archivo. Si quieres empezar a trabajar en una nueva funcionalidad, saltas a su rama correspondiente con este comando. Es el puente para cambiar de contexto dentro del repositorio.

```bash
git checkout rama-existente
git checkout -b nueva-rama # crear y cambiar a la nueva rama
git switch nueva-rama
```

### 10. `git merge`

Cuando terminas una tarea en tu rama y quieres integrar esos cambios al tronco principal o a otra rama, usas este comando [git merge](https://git-scm.com/docs/git-merge). Junta los historiales y une el trabajo que hiciste por tu cuenta con el del resto del equipo. Si hay conflictos porque dos personas tocaron la misma línea, aquí es donde toca revisar y decidir qué se queda.

```bash
git merge rama-a-unir
```

### 11. `git log`

El diario de vida del proyecto. [git status](https://git-scm.com/docs/git-status) te muestra la lista cronológica de todos los commits que se han hecho, quién los hizo, cuándo y con qué mensaje. Es indispensable cuando necesitas buscar en qué momento exacto se introdujo un error o simplemente quieres entender la evolución del código.

```bash
git log
git log --oneline
```

## 12. `git worktree`

Los [worktrees](https://git-scm.com/docs/git-worktree) permiten tener múltiples directorios de trabajo asociados a un mismo repositorio. Esto es útil cuando quieres trabajar en varias ramas al mismo tiempo sin tener que hacer constantes cambios de contexto en un solo directorio.

Actualmente muy usando en el contexto de agentes de IA. Pero es algo de lo que me gustaría tocar y profundizar más en otra publicación.

```bash
git worktree add ../ruta-a-nuevo-worktree rama-existente
git worktree list
git worktree remove ../ruta-a-nuevo-worktree
```

## Conclusión

Aunque la Inteligencia Artificial y las herramientas modernas pueden facilitar muchas tareas, entender estos comandos básicos te da un control total sobre tu flujo de trabajo y te prepara para cualquier situación que pueda surgir en un proyecto de desarrollo.

Pero en realidad, no hace falta complicarse la vida memorizando parámetros raros desde el primer día. Si dominas estos diez comandos, ya tienes lo necesario para moverte con soltura y resolver cualquier flujo de trabajo común.
