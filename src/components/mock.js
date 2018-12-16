import img from "./photos/roupa.jpg"
import img2 from "./photos/roupa2.jpg"

[
    {
        "usuarioId": "12345",
        "nome": "pietro",
        "email": "pietrozp13@gmail.com",
        "perfilPhotoURL": "photoPerfil.svg",
        "senha": "123456",
        "roupas": [
            {
                "descricao": "tenis nike",
                "categotia": "tenis",
                "cor": "preto",
                "size": "40",
                "urlImg": "img.svg"
            }
        ],
        "calendario": [
            {
                "dia": "15/10/1998",
                "manha": [],
                "tarde": [],
                "noite": []
            }
        ]
    }
]

// "categotias"

    
export const mockCategorias = [
        {
            "categotia": "Camisetas",
            "id": 1,
            "roupas":[
                {
                    'name': 'Ben',
                    'id': 1,
                    'img': img
                 },
                 {
                   'name': 'Susan',
                   'id': 2,
                   'img': img
                 },
                 {
                   'name': 'Robert',
                   'id': 3,
                   'img': img
                 },
                 {
                   'name': 'Mary',
                   'id': 4,
                   'img': img
                 },
                 {
                    'name': 'teste',
                    'id': 5,
                    'img': img
                  },
                  {
                    'name': 'Mary',
                    'id': 6,
                    'img': img
                  },
                  {
                     'name': 'teste',
                     'id': 7,
                     'img': img
                   }
            ]
        },
        {
            "categotia": "Tenis",
            "id": 2,
            "roupas":[
                {
                    'name': 'Ben',
                    'id': 1,
                    'img': img2
                 },
                 {
                   'name': 'Susan',
                   'id': 2,
                   'img': img2
                 },
                 {
                   'name': 'Robert',
                   'id': 3,
                   'img': img2
                 },
                 {
                   'name': 'Mary',
                   'id': 4,
                   'img': img2
                 },
                 {
                   'name': 'Robert',
                   'id': 5,
                   'img': img2
                 },
                 {
                   'name': 'Mary',
                   'id': 6,
                   'img': img2
                 }
            ]
        }
    ]