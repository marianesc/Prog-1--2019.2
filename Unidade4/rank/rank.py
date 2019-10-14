#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Imprime Ranking (Cumulativo)

n = int(input())
times = []
pontos = []
colocacao = []

for i in range(n):
    time = input()
    ponto = input()
    times.append(time)
    pontos.append(ponto)
    colocacao.append(i+1)
for i in range(1,n):
    if pontos[i] == pontos[i-1]:
        colocacao[i]=colocacao[i-1]
for j in range(len(times)):
    print("{}. {} ({})".format(colocacao[j],times[j],pontos[j]))

