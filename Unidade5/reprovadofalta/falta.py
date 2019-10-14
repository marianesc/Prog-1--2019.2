#ufcg
#juan silva-119210821
#reprovado por falta

reprovados = 0

while True:
    faltas = 0
    presenca = input()
    if presenca == '-':
        break
    for i in range(len(presenca)):
        if presenca[i] == 'f':
            faltas += 1
    if faltas > 8:
        reprovados += 1
print('{} aluno(s) reprovado(s) por falta.'.format(reprovados))

