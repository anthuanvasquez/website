---
title: La mentira de los Microservicios
date: 2026-10-20
description: Una reflexión sobre la adopción de microservicios en el desarrollo de software y por qué no siempre son la mejor opción.
image: /images/blog/microservices-lie.jpg
alt: La mentira de los Microservicios
duration: 10 min read
tags: ['microservicios', 'arquitectura', 'desarrollo']
language: es
published: true
---

# La mentira de los Microservicios

Hay una idea que se ha vuelto bastante común en el mundo del desarrollo de software. Si estamos comenzando un proyecto nuevo y queremos construir algo que pueda crecer, deberíamos empezar directamente con [[Microservicios]], pareciera razonable. Si sabemos que el producto va a crecer, ¿por qué no preparar la arquitectura desde el principio para soportar ese crecimiento?.

El problema es que entre “prepararse para crecer” y “construir desde hoy como si ya hubiéramos crecido” existe una diferencia bastante grande.

Últimamente he estado pensando mucho en esto porque mientras más aprendo sobre arquitectura de software, más me convence una idea que al principio puede parecer muy contradictoria y es que una buena arquitectura no necesariamente es la que está preparada para soportar cualquier problema futuro, sino permitir que el sistema evolucione cuando los problemas realmente aparezcan.

Eso cambia bastante la forma en la que veo los [[Microservicios]].

## Copiar arquitecturas que no necesitamos

Una de las cosas más fáciles de hacer como ingeniero es mirar cómo trabajan las empresas que están varios niveles por encima de nosotros (pero muy por encima) y asumir que deberíamos estar ==haciendo lo mismo==^[la enfermedad de las startups].

Netflix, Amazon, Uber y un enorme etcetera utiliza [[Microservicios]], por alguna razón, terminamos pensando que esa debe ser la arquitectura correcta para nuestro próximo proyecto. Pero cuando observamos con un poco más de cuidado por qué esas empresas llegaron a esas arquitecturas, la historia es muy distinta.

Una empresa con miles de ingenieros tiene problemas que **un equipo de cinco personas simplemente no tiene.** Cuando cientos de desarrolladores trabajan sobre el mismo sistema, coordinar cambios, despliegues y responsabilidades puede convertirse en un problema enorme. La arquitectura termina teniendo que responder no solamente a las necesidades del software, sino también a las necesidades de la organización que lo construye.

Ahí es donde la [Ley de Conway](https://es.wikipedia.org/wiki/Ley_de_Conway) resulta especialmente interesante. La estructura de una organización termina reflejándose en los sistemas que construye. Los microservicios permiten que distintos equipos puedan trabajar de manera relativamente independiente sobre diferentes partes del producto. En ese contexto, tienen muchísimo sentido.

Pero si somos cinco desarrolladores construyendo un producto nuevo, probablemente nuestro problema no sea que cinco equipos están bloqueándose entre sí para hacer un deployment.

**Nuestro problema probablemente sea conseguir usuarios, entender qué necesitan y construir algo que realmente aporte valor.**

Esa diferencia importa mucho, y por lo general nos damos cuenta tarde.

## Los microservicios no hacen que el código sea más rápido

También existe una percepción bastante extendida de que dividir una aplicación en microservicios la hace más rápida o más escalable automáticamente. La realidad es bastante más interesante.

Cuando dos módulos forman parte de la misma aplicación, comunicarse entre ellos puede ser tan sencillo como ejecutar una función. Todo ocurre dentro del mismo proceso y en memoria. Cuando convertimos esos módulos en servicios independientes, esa comunicación pasa a realizarse a través de la red. Ahora tenemos **HTTP, gRPC,** mensajes, timeouts, reintentos y **latencia de red**.

#### Ejemplo

Monolito modular:

```typescript
// orders/order-service.ts
import { inventoryService } from “../inventory/inventory-service”;

export async function createOrder(productId: string) {
  const available = await inventoryService.checkAvailability(productId);

  if (!available) {
    throw new Error(”Product unavailable”);
  }

  // ...
}
```

vs Microservicio:

```typescript
// orders/order-service.ts
export async function createOrder(productId: string) {
  const response = await fetch(
    "http://api.domain.tld/inventory-service/products/" + productId
  );

  const { available } = await response.json();

  if (!available) {
    throw new Error("Product unavailable");
  }

  // ...
}
```

> [!NOTE] La comunicación entre microservicios es más compleja
> El código se volvió más complicado porque ahora existe una red entre ambos componentes. Tenemos que pensar en timeouts, errores de conexión, respuestas inválidas, reintentos y qué ocurre cuando el otro servicio simplemente no responde.


No significa que un microservicio sea “lento”, hemos cambiado una llamada local por una llamada distribuida, y una llamada distribuida tiene un costo que antes no existía.

Esto puede ser perfectamente aceptable cuando existe una razón para asumirlo. Lo que me parece cuestionable es asumir ese costo desde el principio solamente porque pensamos que algún día podríamos necesitarlo.

Es parecido a comprar una casa pensando en los problemas que tendremos cuando nuestra familia tenga diez personas, cuando actualmente vivimos dos. Quizás algún día necesitemos una casa más grande, pero eso no significa que tengamos que vivir hoy en una casa diseñada para ese escenario.

## La complejidad llega

Lo que me parece más interesante de los microservicios es que la complejidad que introducen no es algo que aparece cuando alcanzamos millones de usuarios. La pagamos desde el primer día.

Si tenemos cinco servicios, ya tenemos cinco procesos que desplegar, monitorear y mantener. Si esos servicios se comunican entre sí, necesitamos manejar errores de red. Si cada uno tiene sus propios logs, necesitamos alguna forma de agregarlos. Si una petición atraviesa varios servicios, necesitamos poder seguirla para entender dónde ocurrió el problema.

Y cuanto más crece el número de servicios, más crece también la superficie operacional del sistema.

Esto no es necesariamente malo. Es simplemente el precio que pagamos por las ventajas que obtenemos a cambio.

El problema aparece cuando pagamos ese precio sin estar obteniendo todavía ningún beneficio que lo compense.

Es fácil terminar dedicando tiempo a decidir cómo desplegar diez servicios, cómo implementar tracing distribuido o cómo manejar mensajes entre componentes cuando el producto todavía está intentando descubrir si alguien realmente quiere utilizarlo.

En ese punto, la arquitectura dejó de ser una herramienta para el producto y empezó a convertirse en parte del problema.

## Cuando una transacción deja de ser una transacción

Quizás uno de los mejores ejemplos de esta complejidad sea el manejo de transacciones.

En un monolito podemos tener una operación relativamente sencilla: crear una orden, descontar inventario y registrar el pago. Todo puede ocurrir dentro de una misma transacción de base de datos. Si algo falla, hacemos rollback y dejamos el sistema exactamente como estaba antes de comenzar.

No necesitamos pensar demasiado en ello porque la base de datos se encarga de una parte importante de esa complejidad.

Ahora imaginemos que cada una de esas responsabilidades vive en un microservicio diferente y que cada servicio tiene su propia base de datos. El servicio de pagos puede haber procesado correctamente el cobro mientras el servicio de inventario falla. Ya no podemos simplemente hacer rollback de toda la operación porque estamos hablando de sistemas independientes.

Tenemos que introducir otros mecanismos para conseguir consistencia: sagas, eventos, mensajes, transacciones compensatorias y estrategias de reintento. Todo esto puede funcionar muy bien y es necesario en sistemas distribuidos de gran escala, pero no deja de ser una cantidad considerable de complejidad adicional.

Y aquí vuelve a aparecer la misma pregunta: ¿tenemos realmente ese problema?

Si la respuesta es no, quizás todavía no necesitamos resolverlo.

## El debugging también cambia

Otra cosa que solemos subestimar es lo diferente que se vuelve encontrar un problema.

En un monolito, cuando algo falla, normalmente tenemos un lugar bastante claro desde donde comenzar la investigación. Tenemos el proceso de la aplicación, sus logs y el flujo de ejecución. Eso no significa que todos los errores sean fáciles de encontrar, pero el modelo mental es relativamente sencillo.

En un sistema distribuido, una misma petición puede atravesar múltiples servicios antes de producir una respuesta. Un error puede originarse en un servicio diferente del que finalmente devuelve el `500`. Puede existir un timeout, un problema de red, un mensaje que nunca llegó o una dependencia que respondió demasiado tarde.

Por eso herramientas como tracing distribuido y OpenTelemetry se vuelven tan importantes en este tipo de arquitecturas. Necesitamos reconstruir el camino que siguió una petición a través de diferentes sistemas para entender qué ocurrió realmente.

De nuevo, no hay nada malo en utilizar estas herramientas. El problema es introducir toda esta complejidad cuando nuestro sistema todavía podría funcionar perfectamente bien con una arquitectura mucho más sencilla.

## El monolito modular no significa hacer las cosas mal

Creo que aquí es donde el monolito modular merece mucha más atención.

Cuando algunas personas escuchan “monolito”, inmediatamente piensan en una aplicación enorme, desordenada, donde cualquier parte del código puede importar cualquier otra y todos terminan dependiendo de todos. Pero eso no es lo que significa necesariamente un monolito.

Podemos tener una única aplicación, un único despliegue y una única base de datos, mientras mantenemos límites bastante estrictos dentro del código. Podemos separar usuarios, pagos, órdenes e inventario en módulos independientes, definir claramente qué puede conocer cada módulo y controlar cómo se comunican entre ellos.

La diferencia fundamental es que todavía tenemos un solo proceso y no necesitamos convertir cada frontera del sistema en una frontera de red.

Para un equipo pequeño, esto puede ser una ventaja enorme. Podemos desarrollar y desplegar con mayor facilidad, podemos utilizar las transacciones de nuestra base de datos cuando las necesitamos y podemos depurar el sistema sin tener que reconstruir mentalmente el recorrido de una petición a través de diez servicios diferentes.

Y lo mejor es que esto no significa que estemos condenados a permanecer en un monolito para siempre.

## La arquitectura debería poder cambiar

Una de las ideas que más me gustan del monolito modular es que permite separar una parte del sistema cuando realmente existe una razón para hacerlo.

Supongamos que tenemos un módulo encargado del procesamiento de imágenes y con el tiempo descubrimos que necesita mucha más capacidad de cómputo que el resto de nuestra aplicación. En ese momento tenemos evidencia. Sabemos que ese componente tiene una necesidad diferente y podemos evaluar si extraerlo a un servicio independiente realmente aporta valor.

Lo mismo podría ocurrir si una parte del sistema necesita utilizar una tecnología diferente, si requiere escalar independientemente o si el tamaño de nuestra organización hace que los despliegues conjuntos comiencen a convertirse en un problema.

La diferencia es que la decisión está basada en un problema real y no en una predicción.

Para mí, ahí está una de las diferencias más importantes entre una arquitectura preparada para evolucionar y una arquitectura construida alrededor de escenarios hipotéticos.

## No necesitamos construir el futuro hoy

Creo que este es el punto que más me interesa de toda esta discusión.

Diseñar pensando en el futuro es importante. Pero intentar construir hoy una solución para todos los problemas que podríamos tener dentro de cinco años puede ser contraproducente.

No sabemos cómo crecerá el producto, qué funcionalidades serán realmente importantes, qué partes del sistema recibirán más tráfico o si tendremos cien usuarios, un millón o ninguno (que es lo más probable al inicio).

Lo que sí sabemos es cuáles son los problemas que tenemos hoy, y nuestra arquitectura debería ayudarnos a resolverlos.

Esto no significa ignorar el futuro, sino dejar suficientes límites y buenas decisiones de diseño para que podamos cambiar cuando el futuro nos dé nueva información.

En lugar de preguntarnos ==“¿cómo construimos esto para soportar cien millones de usuarios?”==, quizás deberíamos empezar preguntándonos ==“¿qué necesitamos construir para nuestros primeros cien usuarios?”==.

Y ya después veremos los siguientes cien, miles, y así sucesivamente.

## La simplicidad

La simplicidad es una decisión de ingeniería y durante mucho tiempo asocié la complejidad con la madurez técnica. Pensaba que mientras más sofisticada fuera una arquitectura, más experiencia demostraba el equipo que la había construido.

Con el tiempo comencé a verlo de otra manera.

Agregar complejidad es relativamente fácil. Podemos añadir otro servicio, otra cola, otra base de datos, otro framework o una nueva capa de abstracción. Lo difícil es decidir que no necesitamos ninguna de esas cosas todavía.

La simplicidad requiere entender muy bien el problema y tener suficiente confianza para no resolver problemas imaginarios.

Por eso no creo que la discusión correcta sea si los microservicios son mejores que los monolitos. Los dos pueden ser excelentes arquitecturas y los dos pueden convertirse en un desastre dependiendo de cómo y por qué los utilicemos.

La pregunta que deberíamos hacernos antes de elegir una arquitectura es mucho más sencilla: **¿qué problema estamos intentando resolver?**

Si todavía no tenemos una buena respuesta, probablemente tampoco necesitemos una arquitectura más compleja.

Porque al final, los usuarios no saben si detrás de nuestro producto existen dos servicios o doscientos. Tampoco les importa si utilizamos microservicios, un monolito modular o una arquitectura completamente diferente.

Lo que les importa es que el producto funcione y resuelva el problema para el que lo construimos.

Y quizás esa sea una de las cosas que más fácilmente olvidamos cuando empezamos a diseñar sistemas: **la arquitectura no es el producto. Es una herramienta para construirlo.**
