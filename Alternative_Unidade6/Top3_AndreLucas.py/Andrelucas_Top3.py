# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Top 3

def top_3(l):
    for indice1 in range(3):
        indice_maior = indice1
        for indice2 in range(indice1, len(l)):
            if l[indice2] > l[indice_maior]:
                indice_maior = indice2
        l[indice1],l[indice_maior] = l[indice_maior], l[indice1]

#l = [1,2,3,4,8,22,-3,5]
#print(l)
#top_3(l)
#print(l)

