export interface AuthResponse {
    data: {
        user: {
            usuario_id: number,
            username: string
        },
        employee: {
            empleado_id: number,
            fecha: string,
        },
        person: {
            person_id: number,
            curp: string,
            nombre: string,
            primer_apellido: string,
            segundo_apellido: string,
            direccion: string,
            telefono: string,
            email: string,
            genero: string,
            fecha_de_nacimiento: string
        },
        accessData: {
            accessToken: string,
            expiresIn: number
        }
    }
}
