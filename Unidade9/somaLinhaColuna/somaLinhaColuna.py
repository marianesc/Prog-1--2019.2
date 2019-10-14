# Davi Sousa

def soma_linha_e_coluna(m, l, c):
    soma = 0
    for i in range(len(m)):
        for j in range(len(m[0])):
            if i == l and j == c: continue

            if i == l: soma += m[i][j]
            elif j == c: soma += m[i][j]

    return soma
