#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Percentagem de aprovados

print("Análise da Turma")
print("===")

aprovados = int(input("Número de aprovados? "))
reprovados = int(input("Número de reprovados? "))

print("---")

total_alunos = aprovados+reprovados
p_aprovados = (100*aprovados)/ total_alunos
p_reprovados = 100-p_aprovados

print("Total de alunos na turma:",total_alunos)
print("Aprovados: {0} = {1:.1f}%".format(aprovados,p_aprovados))
print("Reprovados: {0} = {1:.1f}%".format(reprovados,p_reprovados))
