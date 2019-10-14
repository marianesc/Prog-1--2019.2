#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Status de uma Disciplina

nota1 = float(input())
nota2 = float(input())
nota3 = float(input())
faltas = int(input())

media = (nota1+nota2+nota3)/3
pfaltas = (faltas * 100)/30
ppresenca = 100-pfaltas

if ppresenca > 75:
    if media > 4 and media < 7:
        print("prova final")
    elif media >=7:
        print("aprovado por media")
    else:
       print("reprovado por nota")
else:
    print("reprovado por faltas")
