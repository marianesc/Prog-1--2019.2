# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Reduções

def reducoes(sequencia):
    reducoes=[]
    reducao=0
    for indice in range(len(sequencia)-1):
        reducao = sequencia[indice] - sequencia[indice + 1]
        if reducao < 0:
            reducao = 0

        reducoes.append(reducao)

    return reducoes

#print(reducoes(list(map(int, input().split()))))
