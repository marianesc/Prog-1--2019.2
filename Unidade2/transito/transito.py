#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Perda de Tempo no Trânsito

dia1 = int(input())
dia2 = int(input())
dia3 = int(input())
dia4 = int(input())
dia5 = int(input())

soma = dia1+dia2+dia3+dia4+dia5
media = soma/5
p_media =(soma*100)/7200
ep = soma//50

print("Você perdeu {0} min na semana (média de {1:.1f} min por dia).".format(soma,media))
print("Isso significa {0:.2f}% da sua semana produtiva.".format(p_media))
print("Daria para assistir {0} episódio(s) de House.".format(ep))
