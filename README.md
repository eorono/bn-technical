## Correr Modo Developer

Luego de clonar el repositorio en su maquina y estando en una terminal posicionado en la carpeta clonada ejecutar:

```bash
npm install
```

`(este comando solo necesita lanzarse una vez si lo ha hecho previamente omitirlo)`

luego de instaladas todas las dependencias se puede proceder a escribir:

```bash
npm run dev
```

un vez copilado pueden abrir [http://localhost:3000](http://localhost:3000) con el explorador para ver la pagina ejecutada e incluso el resultados de cualquier modificación que realice en el código.

## Correr Modo Producción

Luego de clonar el repositorio en su maquina y estando en una terminal posicionado en la carpeta clonada ejecutar:

```bash
npm install
```

`(este comando solo necesita lanzarse una vez si lo ha hecho previamente omitirlo)`

luego de instaladas todas las dependencias se puede proceder a escribir:

```bash
npm run build
```

Al ejecutar este comando, se realiza una serie de tareas de compilación y optimización para preparar tu aplicación para su implementación en un entorno de producción, una vez finalizadas estas tareas debes lanzar:

```bash
npm run start
```

para finalmente iniciar un servidor de producción y ejecutar la aplicación construida.
