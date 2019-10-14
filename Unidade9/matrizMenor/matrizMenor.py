# Davi Sousa

def matriz_menor(m1, m2):
    nova = []

    for i in range(len(m1)):
        linha = []
        for j in range(len(m1[0])):
            e1 = m1[i][j]
            e2 = m2[i][j]

            if e1 < e2:
                linha.append(e1)
            else:
                linha.append(e2)
        nova.append(linha)

    return nova
