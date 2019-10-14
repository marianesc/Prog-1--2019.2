# Davi Sousa

def soma_matriz_interna(matriz, inicio, fim):
    achou = False
    soma = 0
    for i in range(len(matriz)):
        for j in range(len(matriz[0])):
            if i == inicio[0] and j == inicio[1]:
                achou = True
            if achou and inicio[1] <= j <= fim[1]:
                soma += matriz[i][j]
            if i == fim[0] and j == fim[1]:
                achou = False
    return soma
