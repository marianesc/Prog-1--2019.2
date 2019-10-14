#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Encontra elemento

n = int(input())
lista = [int(num) for num in input().split()]
sim = 0

for i in range(len(lista)):
    if n == lista[i]:
        sim += 1
        
if sim != 0:
    print("sim")
else:
    print("não")

