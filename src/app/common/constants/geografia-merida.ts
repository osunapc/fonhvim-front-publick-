export interface Parroquia {
  id: string;
  nombre: string;
}

export interface Municipio {
  id: string;
  nombre: string;
  parroquias: Parroquia[];
}

export const MUNICIPIOS_MERIDA: Municipio[] = [
  {
    id: 'alberto-adriani',
    nombre: 'Alberto Adriani',
    parroquias: [
      { id: 'presidente-betancourt', nombre: 'Presidente Betancourt' },
      { id: 'presidente-paez', nombre: 'Presidente Páez' },
      {
        id: 'presidente-romulo-gallegos',
        nombre: 'Presidente Rómulo Gallegos',
      },
      { id: 'gabriel-picon-gonzalez', nombre: 'Gabriel Picón González' },
      { id: 'hector-amable-mora', nombre: 'Hector Amable Mora' },
      { id: 'jose-nucete-sardi', nombre: 'José Nucete Sardi' },
      { id: 'pulido-mendez', nombre: 'Pulido Méndez' },
    ],
  },
  {
    id: 'andres-bello',
    nombre: 'Andrés Bello',
    parroquias: [{ id: 'andres-bello', nombre: 'Andrés Bello' }],
  },
  {
    id: 'antonio-pinto-salinas',
    nombre: 'Antonio Pinto Salinas',
    parroquias: [
      { id: 'antonio-pinto-salinas', nombre: 'Antonio Pinto Salinas' },
      { id: 'mesa-bolivar', nombre: 'Mesa Bolívar' },
      { id: 'mesa-de-las-palmas', nombre: 'Mesa de las Palmas' },
    ],
  },
  {
    id: 'aricagua',
    nombre: 'Aricagua',
    parroquias: [
      { id: 'aricagua', nombre: 'Aricagua' },
      { id: 'san-antonio', nombre: 'San Antonio' },
    ],
  },
  {
    id: 'arzobispo-chacon',
    nombre: 'Arzobispo Chacón',
    parroquias: [
      { id: 'arzobispo-chacon', nombre: 'Arzobispo Chacón' },
      { id: 'capuri', nombre: 'Capurí' },
      { id: 'chacanta', nombre: 'Chacantá' },
      { id: 'el-molino', nombre: 'El Molino' },
      { id: 'guaimaral', nombre: 'Guaimaral' },
      { id: 'mucutuy', nombre: 'Mucutuy' },
      { id: 'mucuchachi', nombre: 'Mucuchachí' },
    ],
  },
  {
    id: 'campo-elias',
    nombre: 'Campo Elías',
    parroquias: [
      { id: 'fernandez-pena', nombre: 'Fernández Peña' },
      { id: 'matriz', nombre: 'Matriz' },
      { id: 'montalban', nombre: 'Montalbán' },
      { id: 'acequias', nombre: 'Acequias' },
      { id: 'jaji', nombre: 'Jají' },
      { id: 'la-mesa', nombre: 'La Mesa' },
      { id: 'san-jose', nombre: 'San José' },
    ],
  },
  {
    id: 'caracciolo-parra-olmedo',
    nombre: 'Caracciolo Parra Olmedo',
    parroquias: [
      { id: 'caracciolo-parra-olmedo', nombre: 'Caracciolo Parra Olmedo' },
      { id: 'florencio-ramirez', nombre: 'Florencio Ramírez' },
    ],
  },
  {
    id: 'cardenal-quintero',
    nombre: 'Cardenal Quintero',
    parroquias: [
      { id: 'cardenal-quintero', nombre: 'Cardenal Quintero' },
      { id: 'las-piedras', nombre: 'Las Piedras' },
    ],
  },
  {
    id: 'guaraque',
    nombre: 'Guaraque',
    parroquias: [
      { id: 'guaraque', nombre: 'Guaraque' },
      { id: 'mesa-de-quintero', nombre: 'Mesa de Quintero' },
      { id: 'rio-negro', nombre: 'Río Negro' },
    ],
  },
  {
    id: 'julio-cesar-salas',
    nombre: 'Julio César Salas',
    parroquias: [
      { id: 'julio-cesar-salas', nombre: 'Julio César Salas' },
      { id: 'palmira', nombre: 'Palmira' },
    ],
  },
  {
    id: 'justo-briceno',
    nombre: 'Justo Briceño',
    parroquias: [
      { id: 'justo-briceno', nombre: 'Justo Briceño' },
      { id: 'san-cristobal-de-torondoy', nombre: 'San Cristóbal de Torondoy' },
    ],
  },
  {
    id: 'libertador',
    nombre: 'Libertador',
    parroquias: [
      { id: 'antonio-spinetti-dini', nombre: 'Antonio Spinetti Dini' },
      { id: 'arias', nombre: 'Arias' },
      { id: 'caracciolo-parra-perez', nombre: 'Caracciolo Parra Pérez' },
      { id: 'domingo-pena', nombre: 'Domingo Peña' },
      { id: 'el-llano', nombre: 'El Llano' },
      { id: 'gonzalo-picon-febres', nombre: 'Gonzalo Picón Febres' },
      { id: 'jacinto-plaza', nombre: 'Jacinto Plaza' },
      { id: 'juan-rodriguez-suarez', nombre: 'Juan Rodríguez Suárez' },
      { id: 'lasso-de-la-vega', nombre: 'Lasso de la Vega' },
      { id: 'mariano-picon-salas', nombre: 'Mariano Picón Salas' },
      { id: 'milla', nombre: 'Milla' },
      { id: 'osuna-rodriguez', nombre: 'Osuna Rodríguez' },
      { id: 'sagrario', nombre: 'Sagrario' },
      { id: 'santa-juana', nombre: 'Santa Juana' },
    ],
  },
  {
    id: 'miranda',
    nombre: 'Miranda',
    parroquias: [
      { id: 'miranda', nombre: 'Miranda' },
      { id: 'andres-eloy-blanco', nombre: 'Andrés Eloy Blanco' },
      { id: 'chachopo', nombre: 'Chachopo' },
      { id: 'la-venta', nombre: 'La Venta' },
    ],
  },
  {
    id: 'obispo-ramos-de-lora',
    nombre: 'Obispo Ramos de Lora',
    parroquias: [
      { id: 'obispo-ramos-de-lora', nombre: 'Obispo Ramos de Lora' },
      { id: 'santa-elena-de-arenales', nombre: 'Santa Elena de Arenales' },
      { id: 'san-rafael-de-alcazar', nombre: 'San Rafael de Alcázar' },
    ],
  },
  {
    id: 'padre-noguera',
    nombre: 'Padre Noguera',
    parroquias: [{ id: 'padre-noguera', nombre: 'Padre Noguera' }],
  },
  {
    id: 'pueblo-llano',
    nombre: 'Pueblo Llano',
    parroquias: [{ id: 'pueblo-llano', nombre: 'Pueblo Llano' }],
  },
  {
    id: 'rangel',
    nombre: 'Rangel',
    parroquias: [
      { id: 'rangel', nombre: 'Rangel' },
      { id: 'cacute', nombre: 'Cacute' },
      { id: 'la-toma', nombre: 'La Toma' },
      { id: 'mucuruba', nombre: 'Mucurubá' },
      { id: 'san-rafael', nombre: 'San Rafael' },
    ],
  },
  {
    id: 'rivas-davila',
    nombre: 'Rivas Dávila',
    parroquias: [
      { id: 'rivas-davila', nombre: 'Rivas Dávila' },
      { id: 'geronimo-maldonado', nombre: 'Gerónimo Maldonado' },
    ],
  },
  {
    id: 'santos-marquina',
    nombre: 'Santos Marquina',
    parroquias: [{ id: 'santos-marquina', nombre: 'Santos Marquina' }],
  },
  {
    id: 'sucre',
    nombre: 'Sucre',
    parroquias: [
      { id: 'sucre', nombre: 'Sucre' },
      { id: 'chiguara', nombre: 'Chiguará' },
      { id: 'estanchez', nombre: 'Estánquez' },
      { id: 'la-trampa', nombre: 'La Trampa' },
      { id: 'pueblo-nuevo-del-sur', nombre: 'Pueblo Nuevo del Sur' },
      { id: 'san-juan', nombre: 'San Juan' },
      { id: 'la-victoria', nombre: 'La Victoria' },
    ],
  },
  {
    id: 'tovar',
    nombre: 'Tovar',
    parroquias: [
      { id: 'tovar', nombre: 'Tovar' },
      { id: 'el-llano', nombre: 'El Llano' },
      { id: 'san-francisco', nombre: 'San Francisco' },
      { id: 'el-amparo', nombre: 'El Amparo' },
    ],
  },
  {
    id: 'tulio-febres-cordero',
    nombre: 'Tulio Febres Cordero',
    parroquias: [
      { id: 'tulio-febres-cordero', nombre: 'Tulio Febres Cordero' },
      { id: 'independencia', nombre: 'Independencia' },
      { id: 'maria-concepcion-palacios', nombre: 'María Concepción Palacios' },
      { id: 'santa-apolonia', nombre: 'Santa Apolonia' },
    ],
  },
  {
    id: 'zea',
    nombre: 'Zea',
    parroquias: [
      { id: 'zea', nombre: 'Zea' },
      { id: 'cano-el-tigre', nombre: 'Caño El Tigre' },
    ],
  },
];
