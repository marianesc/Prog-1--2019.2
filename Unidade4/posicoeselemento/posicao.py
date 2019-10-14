#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Posições de um elemento em uma sequência

n = int(input())
sequencia = input().split()
nvezes = []

for i in range(len(sequencia)):
    sequencia[i] = int(sequencia[i])
    if sequencia[i] == n:
        nvezes.append(i)

if len(nvezes) > 0:
    for j in range(len(nvezes)):
        if j!=len(nvezes)-1:
            print(nvezes[j],end=' ')
        else:
            print(nvezes[j])
else:
    print("-1")



