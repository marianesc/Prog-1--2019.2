# Davi Sousa

def zera_acima_ou_abaixo(m):

    def soma_acima(m):
        soma = 0
        for i in range(len(m)):
            for j in range(len(m[0])):
                e = m[i][j]
                if j > i:
                    soma += e
        return soma

    def soma_abaixo(m):
        soma = 0
        for i in range(len(m)):
            for j in range(len(m[0])):
                e = m[i][j]
                if j < i:
                    soma += e
        return soma

    acima = soma_acima(m)
    abaixo = soma_abaixo(m)

    if acima == abaixo:
        for i in range(len(m)):
            for j in range(len(m[0])):
                if not i == j:
                    m[i][j] = 0
    elif acima > abaixo:
        for i in range(len(m)):
            for j in range(len(m[0])):
                if j > i:
                    m[i][j] = 0
    else:
        for i in range(len(m)):
            for j in range(len(m[0])):
                if j < i:
                    m[i][j] = 0
