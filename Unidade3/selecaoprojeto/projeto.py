#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Seleção Projeto

cre = float(input())
xp = int(input())
notae = int(input())

if cre < 7 and xp < 6:
    print("Candidato eliminado. CRE e experiência abaixo do limite.")
elif cre < 7:
    print("Candidato eliminado. CRE abaixo do limite.")
elif xp < 6:
    print("Candidato eliminado. Experiência abaixo do limite.")
elif notae <=3:
    print("Candidato classificado.")
else:
    print("Candidato aprovado.")
