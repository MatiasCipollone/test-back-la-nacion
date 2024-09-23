import accountsData from "./accounts.json";
import { Account, Branch } from "../types";

const accounts: Account[] = accountsData.accounts as Account[];

// Filtrar y ordenar para el primer carrusel (Turismo en Buenos Aires)
export const getTourismAccounts = (): Partial<Account>[] => {
  const filteredAccounts = accounts.filter((account: Account) =>
    account.tags.some((tag) => tag.name === "Turismo en Buenos Aires")
  );

  const sortedAccounts = filteredAccounts.sort((a, b) => {
    const distanceA = Math.min(
      ...a.branches.map((branch: Branch) => branch.location)
    );
    const distanceB = Math.min(
      ...b.branches.map((branch: Branch) => branch.location)
    );
    return distanceA - distanceB;
  });

  // Devuelve los primeros 4 elementos con los datos requeridos
  return sortedAccounts.slice(0, 4).map((account: Account) => ({
    name: account.name,
    image: account.images.find((img) => img.url)?.url || "",
    url: `https://club.lanacion.com.ar/${account.crmid}`,
    maxBenefitValue: getMaxBenefitValue(account),
    closestDistance: formatDistance(
      Math.min(...account.branches.map((branch: Branch) => branch.location))
    ),
  }));
};

// Filtrar y ordenar para el segundo carrusel (haveVoucher)
export const getVoucherAccounts = (): Partial<Account>[] => {
  const filteredAccounts = accounts.filter(
    (account: Account) => account.haveVoucher
  );

  const sortedAccounts = filteredAccounts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Devuelve los primeros 4 elementos con los datos requeridos
  return sortedAccounts.slice(0, 4).map((account: Account) => ({
    name: account.name,
    image: account.images.find((img) => img.url)?.url || "",
    url: `https://club.lanacion.com.ar/${account.crmid}`,
    buttonLabel: "Promocode",
  }));
};

const getMaxBenefitValue = (account: Account): string => {
  const benefitCategories = ["Classic", "Premium", "Black"];
  const benefits = account.benefits.filter((benefit) =>
    benefitCategories.includes(benefit.category)
  );
  return Math.max(
    ...benefits.map((benefit) => parseFloat(benefit.value))
  ).toString();
};

const formatDistance = (distance: number): string => {
  return distance >= 1000
    ? `${(distance / 1000).toFixed(2)} km`
    : `${distance} m`;
};
