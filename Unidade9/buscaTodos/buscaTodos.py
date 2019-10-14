# Davi Sousa

def busca_matriz(m, meta):
    posicoes = []

    for i in range(len(m)):
        for j in range(len(m[0])):
            e = m[i][j]
            if e == meta:
                posicoes.append((i, j))

    return posicoes
