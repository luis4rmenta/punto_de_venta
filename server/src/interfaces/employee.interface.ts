export interface Employee {
    empleado_id?: string | number,
    persona_id?: string | number,
    curp: string,
    nombre: string, 
    primer_apellido: string,
    segundo_apellido: string,
    direccion: string,
    telefono: string,
    email: string,
    genero: string,
    fecha_de_nacimiento: string,
    tipo_empleado_id: number,
    fecha_de_contrato: string
}