class GA {
    constructor (targetSentence, populationSize, mutationRate, parentPopulationSize) {
        this.population = [];
        this.populationSize = populationSize;
        this.parentPopulationSize = Math.max(1, Math.min(populationSize, parentPopulationSize));
        this.mutationRate = mutationRate;
        this.targetSentence = targetSentence;
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
        this.bestMember = null;

        this.initializePopulation();
    }

    generateRandomString(length) {
        let text = '';
        for (let i = 0; i < length; i++) {
            text += this.chars.charAt(Math.floor(Math.random() * this.chars.length))
        }
        return text;
    }

    initializePopulation() {
        this.population = [];
        for (let i = 0; i < this.populationSize; i++) {
            const genome = this.generateRandomString(this.targetSentence.length);
            const fitness = this.calculateFitness(genome);
            this.addToPopulation(genome, fitness);
        }
    }

    addToPopulation(genome, fitness) {
        //keep track of record
        if (this.bestMember == null || fitness > this.bestMember.fitness) {
            this.bestMember = { genome, fitness };
        }
        this.population.push({ genome, fitness });
    }

    calculateFitness(genome) {
        let score = 0;
        for (let i = 0; i < genome.length; i++) {
            if (genome.charAt(i) === this.targetSentence.charAt(i)) {
                score++;
            }
        }
        return score / this.targetSentence.length;
    }

    getBestGenomes(amount) {
        return this.population
            .sort((a, b) => b.fitness - a.fitness)
            .slice(0, amount);
    }

    crossover(parent1, parent2) {
        const midpoint = Math.floor(Math.random() * parent1.genome.length);
        const childGenome = parent1.genome.slice(0, midpoint) + parent2.genome.slice(midpoint);
        return { genome: childGenome, fitness: this.calculateFitness(childGenome) };
    }


    mutate(genome) {
        let mutatedGenome = '';
        for (let i = 0; i < genome.length; i++) {
            if (Math.random() < this.mutationRate) {
                const newChar = this.generateRandomString(1);
                mutatedGenome += newChar;
            } else {
                mutatedGenome += genome.charAt(i);
            }
        }
        return { genome: mutatedGenome, fitness: this.calculateFitness(mutatedGenome) };
    }

    evolve() {
        const parents = this.getBestGenomes(this.parentPopulationSize);
        const newPopulation = [];

        while (newPopulation.length < this.populationSize) {
            const parent1 = parents[Math.floor(Math.random() * parents.length)];
            const parent2 = parents[Math.floor(Math.random() * parents.length)];
            const child = this.crossover(parent1, parent2);
            const mutatedChild = this.mutate(child.genome);
            newPopulation.push(mutatedChild);
        }

        this.population = [];
        newPopulation.forEach(member => this.addToPopulation(member.genome, member.fitness));

    }
}
