# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 1192102592
# Seleção Projeto

CRE = float(input())
mesesExperiencia=int(input())
notaEntrevista=int(input())

if CRE >= 7 and mesesExperiencia >= 6 and notaEntrevista > 3:
    print("Candidato aprovado.")

elif CRE >= 7 and mesesExperiencia >= 6 and notaEntrevista <= 3:
    print("Candidato classificado.")

elif CRE < 7 and mesesExperiencia < 6:
    print("Candidato eliminado. CRE e experiência abaixo do limite.")

elif CRE < 7 and mesesExperiencia >= 6:
    print("Candidato eliminado. CRE abaixo do limite.")

elif CRE >= 7 and mesesExperiencia < 6:
    print("Candidato eliminado. Experiência abaixo do limite.")

