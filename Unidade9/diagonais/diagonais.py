# Davi Sousa

def diagonais(matriz):

    def get_principal(matriz):
        principal = []
        for i in range(len(matriz)):
            principal.append(matriz[i][i])
        return principal

    def get_secundaria(matriz):
        secundaria = []
        for i in range(len(matriz)):
            secundaria.append(matriz[i][(len(matriz) - 1) - i])
        return secundaria

    principal = get_principal(matriz)
    secundaria = get_secundaria(matriz)

    return [principal, secundaria]
