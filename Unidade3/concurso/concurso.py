#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Concurso

anota1 = float(input())
anota2 = float(input())
anota3 = float(input())
aidade = int(input())
bnota1 = float(input())
bnota2 = float(input())
bnota3 = float(input())
bidade = int(input())

amedia = ((anota1 * 30) + (anota2 * 40) + (anota3 * 30)) / 100
bmedia = ((bnota1 * 30) + (bnota2 * 40) + (bnota3 * 30)) / 100

if amedia > bmedia:
    print("O primeiro candidato foi aprovado com média {:.1f}.".format(amedia))
elif bmedia > amedia:
    print("O segundo candidato foi aprovado com média {:.1f}.".format(bmedia))
elif amedia == bmedia and aidade > bidade:
    print("O primeiro candidato foi aprovado com média {:.1f}.".format(amedia))
elif amedia == bmedia and bidade > aidade:
    print("O segundo candidato foi aprovado com média {:.1f}.".format(bmedia))
else:
    print("Empate.")
