#Leonardo Su 00:25 17/10/2019
def find(x,lista):
	for e in lista:
		if x == e:
			return True
	return False

def numero_disciplinas(m1,m2,lista):
	
	pode_pagar = []
	for e in m1.keys():
		bota = True
		for now in m1[e]:
			if not find(now,lista):
				bota = False
				break

		if bota == True and not find(e,lista):
			pode_pagar.append(e)
	horario_mark = []

	for aula in pode_pagar:
		time = m2[aula]

		if not find(time,horario_mark):
			horario_mark.append(time)

	return len(horario_mark)

grade = {
		"p1": [], 
		"lp1": [], 
		"ic": [],
		"calc1": [], 
		"p2": ["ic", "p1", "lp1"],
		"lp2": ["ic", "p1", "lp1"], 
		"grafos": ["ic", "p1", "lp1"], 
		"calc2"  : ["calc1"], 
		"edados": ["ic", "p1", "lp1", "p2", "lp2", "grafos"],
		"leda": ["ic", "p1", "lp1", "p2", "lp2", "grafos"]
		}

horarios= {
			"p1": "s082", 
			"lp2": "s082",

			"leda": "t102",
			"p2": "t162",

			"calc1": "q082", 
			"grafos": "q082", 

			"calc2": "x162", 
			"edados": "x162", 
			"lp1": "x082", 

			"ic": "i142"
			}

assert numero_disciplinas(grade, horarios, []) == 4
assert numero_disciplinas(grade, horarios, ["ic", "p1", "lp1"]) == 3