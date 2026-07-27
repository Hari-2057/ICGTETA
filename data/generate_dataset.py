import os
import numpy as np
import pandas as pd

def generate_routine_lab_dataset(n_samples: int = 3500, random_seed: int = 42) -> pd.DataFrame:
    """
    Generates a realistic routine laboratory blood test dataset of 3,500 patient records
    following ADA/WHO diagnostic guidelines and physiological correlations.
    """
    np.random.seed(random_seed)
    
    # 1. Targets & Demographics
    statuses = np.random.choice(["Healthy", "Prediabetes", "Type 2 Diabetes"], size=n_samples, p=[0.45, 0.30, 0.25])
    
    ages = np.random.randint(18, 85, size=n_samples)
    genders = np.random.choice(["Female", "Male"], size=n_samples)
    
    # BMI and Waist circumference correlated with disease status
    bmis = []
    waist_circs = []
    systolic_bps = []
    diastolic_bps = []
    
    # Biomarkers
    hba1cs = []
    fpgs = []
    rpgs = []
    
    # Lipids
    total_chols = []
    hdls = []
    ldls = []
    vldls = []
    tgs = []
    
    # CBC
    hemoglobins = []
    rbcs = []
    wbcs = []
    platelets = []
    hematocrits = []
    mcvs = []
    mchs = []
    mchcs = []
    
    # Renal & Liver
    creatinines = []
    buns = []
    uric_acids = []
    alts = []
    asts = []
    alps = []
    bilirubins = []
    
    # Electrolytes
    sodiums = []
    potassiums = []
    chlorides = []
    
    # Lifestyle factors
    smoking_statuses = np.random.choice(["Never", "Former", "Current"], size=n_samples, p=[0.6, 0.25, 0.15])
    alcohol_consumptions = np.random.choice(["None", "Moderate", "Heavy"], size=n_samples, p=[0.5, 0.4, 0.1])
    physical_activities = np.random.choice(["Low", "Moderate", "High"], size=n_samples, p=[0.4, 0.4, 0.2])
    family_histories = np.random.choice(["No", "Yes"], size=n_samples, p=[0.6, 0.4])

    for status, gender in zip(statuses, genders):
        if status == "Healthy":
            hba1c = np.random.normal(5.1, 0.3)
            fpg = np.random.normal(86.0, 7.0)
            rpg = np.random.normal(108.0, 12.0)
            bmi = np.random.normal(23.5, 3.0)
            sbp = np.random.normal(116.0, 8.0)
            dbp = np.random.normal(74.0, 6.0)
            tg = np.random.normal(110.0, 25.0)
            hdl = np.random.normal(55.0, 10.0)
            ldl = np.random.normal(100.0, 20.0)
            alt = np.random.normal(22.0, 6.0)
            ast = np.random.normal(20.0, 5.0)
            creat = np.random.normal(0.85, 0.15)
            bun = np.random.normal(13.0, 3.0)
        elif status == "Prediabetes":
            hba1c = np.random.normal(6.0, 0.2)
            fpg = np.random.normal(112.0, 8.0)
            rpg = np.random.normal(150.0, 15.0)
            bmi = np.random.normal(28.5, 4.0)
            sbp = np.random.normal(128.0, 10.0)
            dbp = np.random.normal(82.0, 7.0)
            tg = np.random.normal(165.0, 35.0)
            hdl = np.random.normal(42.0, 8.0)
            ldl = np.random.normal(130.0, 25.0)
            alt = np.random.normal(32.0, 10.0)
            ast = np.random.normal(28.0, 8.0)
            creat = np.random.normal(0.98, 0.2)
            bun = np.random.normal(15.5, 4.0)
        else: # Type 2 Diabetes
            hba1c = np.random.normal(8.5, 1.4)
            fpg = np.random.normal(175.0, 35.0)
            rpg = np.random.normal(240.0, 45.0)
            bmi = np.random.normal(33.0, 5.5)
            sbp = np.random.normal(140.0, 14.0)
            dbp = np.random.normal(88.0, 9.0)
            tg = np.random.normal(220.0, 55.0)
            hdl = np.random.normal(36.0, 7.0)
            ldl = np.random.normal(155.0, 30.0)
            alt = np.random.normal(46.0, 15.0)
            ast = np.random.normal(40.0, 12.0)
            creat = np.random.normal(1.25, 0.35)
            bun = np.random.normal(19.0, 5.0)

        # Clip values to physiological bounds
        hba1cs.append(round(float(np.clip(hba1c, 4.0, 14.0)), 1))
        fpgs.append(round(float(np.clip(fpg, 60.0, 350.0)), 1))
        rpgs.append(round(float(np.clip(rpg, 70.0, 400.0)), 1))
        bmis.append(round(float(np.clip(bmi, 16.0, 48.0)), 1))
        systolic_bps.append(round(float(np.clip(sbp, 90.0, 190.0)), 1))
        diastolic_bps.append(round(float(np.clip(dbp, 55.0, 115.0)), 1))
        
        waist_mult = 3.1 if gender == "Male" else 2.9
        waist_circs.append(round(float(bmi * waist_mult), 1))
        
        tgs.append(round(float(np.clip(tg, 40.0, 500.0)), 1))
        hdls.append(round(float(np.clip(hdl, 20.0, 95.0)), 1))
        ldls.append(round(float(np.clip(ldl, 40.0, 240.0)), 1))
        vldls.append(round(float(tg / 5.0), 1))
        total_chols.append(round(float(hdl + ldl + tg / 5.0), 1))
        
        # CBC
        hgb = np.random.normal(14.5 if gender == "Male" else 13.5, 1.2)
        hemoglobins.append(round(float(np.clip(hgb, 10.0, 18.0)), 1))
        rbcs.append(round(float(np.clip(np.random.normal(4.8, 0.4), 3.5, 6.2)), 2))
        wbcs.append(round(float(np.clip(np.random.normal(7.2, 1.5), 3.8, 12.5)), 1))
        platelets.append(round(float(np.clip(np.random.normal(250.0, 45.0), 140.0, 450.0)), 1))
        hematocrits.append(round(float(np.clip(hgb * 3.0, 32.0, 54.0)), 1))
        mcvs.append(round(float(np.clip(np.random.normal(88.0, 4.0), 75.0, 102.0)), 1))
        mchs.append(round(float(np.clip(np.random.normal(29.5, 2.0), 24.0, 35.0)), 1))
        mchcs.append(round(float(np.clip(np.random.normal(33.5, 1.2), 30.0, 37.0)), 1))
        
        # Renal & Liver
        creatinines.append(round(float(np.clip(creat, 0.4, 3.5)), 2))
        buns.append(round(float(np.clip(bun, 6.0, 45.0)), 1))
        uric_acids.append(round(float(np.clip(np.random.normal(5.5, 1.3), 2.5, 10.5)), 1))
        alts.append(round(float(np.clip(alt, 8.0, 120.0)), 1))
        asts.append(round(float(np.clip(ast, 10.0, 110.0)), 1))
        alps.append(round(float(np.clip(np.random.normal(70.0, 18.0), 30.0, 150.0)), 1))
        bilirubins.append(round(float(np.clip(np.random.normal(0.7, 0.2), 0.2, 2.2)), 2))
        
        # Electrolytes
        sodiums.append(round(float(np.clip(np.random.normal(140.0, 2.0), 132.0, 148.0)), 1))
        potassiums.append(round(float(np.clip(np.random.normal(4.3, 0.3), 3.2, 5.5)), 1))
        chlorides.append(round(float(np.clip(np.random.normal(102.0, 2.5), 95.0, 110.0)), 1))

    # Weight and Height calculation
    heights = np.where(genders == "Male", np.random.normal(175.0, 6.0, size=n_samples), np.random.normal(162.0, 5.5, size=n_samples))
    heights = np.round(np.clip(heights, 140.0, 200.0), 1)
    weights = np.round(bmis * ((heights / 100.0) ** 2), 1)

    df = pd.DataFrame({
        "age": ages, "gender": genders, "bmi": bmis, "weight": weights, "height": heights,
        "systolic_bp": systolic_bps, "diastolic_bp": diastolic_bps, "waist_circ": waist_circs,
        "smoking_status": smoking_statuses, "alcohol_consumption": alcohol_consumptions,
        "physical_activity": physical_activities, "family_history": family_histories,
        "hba1c": hba1cs, "fasting_glucose": fpgs, "random_glucose": rpgs,
        "hemoglobin": hemoglobins, "rbc_count": rbcs, "wbc_count": wbcs, "platelet_count": platelets,
        "hematocrit": hematocrits, "mcv": mcvs, "mch": mchs, "mchc": mchcs,
        "total_cholesterol": total_chols, "hdl": hdls, "ldl": ldls, "vldl": vldls, "triglycerides": tgs,
        "creatinine": creatinines, "bun": buns, "uric_acid": uric_acids,
        "alt": alts, "ast": asts, "alp": alps, "bilirubin": bilirubins,
        "sodium": sodiums, "potassium": potassiums, "chloride": chlorides,
        "diabetes_status": statuses
    })

    return df

if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "diabetes_routine_lab_dataset.csv")
    
    df = generate_routine_lab_dataset(3500)
    df.to_csv(out_path, index=False)
    print(f"[Dataset Generator] Successfully saved {len(df)} patient records to {out_path}")
