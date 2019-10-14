# UFCG - Programaçao 1 -2019.2
# André Lucas Medeiros Martins - 119210592
# Quanto Tempo

def quanto_tempo(horario1, horario2):
    horas = int(horario2[0] + horario2[1]) - int(horario1[0] + horario1[1])
    minutos = int(horario2[3] + horario2[4]) - int(horario1[3] + horario1[4]) 
    
    if minutos < 0:
        horas -= 1
        minutos += 60

    return '{} hora(s) e {} minuto(s)'.format(horas, minutos)

print(quanto_tempo('07:15', '09:12'))
