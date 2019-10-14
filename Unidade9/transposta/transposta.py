# Davi Sousa

def transposta(m):
    quantidade_linhas = len(m[0])

    nova = [[] for i in range(quantidade_linhas)]

    for i in range(len(m)):
        for j in range(len(m[0])):
            nova[j].append(m[i][j])

    return nova
