import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  LeadStackParamList,
  HomeStackParamList,
  BookingStackParamList,
  MenuStackParamList,
  AuthStackParamList,
  EoiStackParamList,
} from './StackNavigationTypes';
import { TabParamsList } from './TabNavigationTypes';

export type ScreenPropsType<N, R> = {
  navigation: N;
  route: R;
};

// HOME TAB
export type HomeNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'Home'>
>;

export type HomeRouteProp = RouteProp<HomeStackParamList, 'Home'>;

// BUILDING LIST
export type BuildingListNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'BuildingList'>
>;
export type BuildingListRouteProp = RouteProp<
  HomeStackParamList,
  'BuildingList'
>;

// INVENTORY LIST
export type InventoryListNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'InventoryList'>
>;
export type InventoryListRouteProp = RouteProp<
  HomeStackParamList,
  'InventoryList'
>;

// PROPERTY FILTER
export type PropertyFilterNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'PropertyFilter'>
>;
export type PropertyFilterRouteProp = RouteProp<
  HomeStackParamList,
  'PropertyFilter'
>;

// PROPERTY DETAILS
export type PropertyDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'PropertyDetails'>
>;
export type PropertyDetailsRouteProp = RouteProp<
  HomeStackParamList,
  'PropertyDetails'
>;

//BOOK PROPERTY
export type BookPropertyNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'BookProperty'>
>;
export type BookPropertyRouteProp = RouteProp<
  HomeStackParamList,
  'BookProperty'
>;

// INVENTORY LIST
export type InventoryDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'InventoryDetails'>
>;
export type InventoryDetailsRouteProp = RouteProp<
  HomeStackParamList,
  'InventoryDetails'
>;

// Project Details
export type ProjectDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'ProjectDetails'>
>;
export type ProjectDetailsRouteProp = RouteProp<
  HomeStackParamList,
  'ProjectDetails'
>;

// PAYMENT
export type PaymentNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'Payment'>
>;
export type PaymentRouteProp = RouteProp<HomeStackParamList, 'Payment'>;

// UNIT SEARCH
export type UnitNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'UnitSearch'>
>;
export type UnitRouteProp = RouteProp<HomeStackParamList, 'UnitSearch'>;

// Filter Search Page Props
export type FilterNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'FilterSearch'>
>;
export type FilterRouteProp = RouteProp<HomeStackParamList, 'FilterSearch'>;

export type LatestDetailsRouteProp = RouteProp<
  BookingStackParamList,
  'LatestDetailsScreen'
>;

// Leads TAB
export type LeadsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'LeadsTab'>,
  StackNavigationProp<LeadStackParamList, 'Leads'>
>;
export type LeadsRouteProp = RouteProp<LeadStackParamList, 'Leads'>;

// ADD LEAD SCREEN
export type AddLeadNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'LeadsTab'>,
  StackNavigationProp<LeadStackParamList, 'AddLead'>
>;
export type AddLeadRouteProp = RouteProp<LeadStackParamList, 'AddLead'>;

// Lead Details screen
export type LeadDetailNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'LeadsTab'>,
  StackNavigationProp<LeadStackParamList, 'LeadDetail'>
>;
export type LeadDetailRouteProp = RouteProp<LeadStackParamList, 'LeadDetail'>;

// EOIs TAB
export type EoisNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'EoiTab'>,
  StackNavigationProp<EoiStackParamList, 'Eois'>
>;
export type EoisRouteProp = RouteProp<MenuStackParamList, 'Eois'>;

// Add EOi TAB
export type AddEoiNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'EoiTab'>,
  StackNavigationProp<EoiStackParamList, 'AddEoi'>
>;
export type AddEoiRouteProp = RouteProp<EoiStackParamList, 'AddEoi'>;

// Add EOi Payment TAB
export type EOIPaymentPreviewNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'EoiTab'>,
  StackNavigationProp<EoiStackParamList, 'EOIPaymentPreview'>
>;
export type EOIPaymentPreviewRouteProp = RouteProp<
  EoiStackParamList,
  'EOIPaymentPreview'
>;

// Add EOi Payment TAB
export type EoiPaymentNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'EoiTab'>,
  StackNavigationProp<EoiStackParamList, 'EoiPayment'>
>;
export type EoiPaymentRouteProp = RouteProp<EoiStackParamList, 'EoiPayment'>;

// EOIs details screen
export type EoiDetailNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'EoiTab'>,
  StackNavigationProp<EoiStackParamList, 'EoiDetail'>
>;
export type EoiDetailRouteProp = RouteProp<EoiStackParamList, 'EoiDetail'>;

// EOIs TAB
export type LeadListNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'LeadsTab'>,
  StackNavigationProp<LeadStackParamList, 'LeadList'>
>;
export type LeadListRouteProp = RouteProp<LeadStackParamList, 'LeadList'>;

// Agents Screen
export type AgentListNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'AgentList'>
>;
export type AgentListRouteProp = RouteProp<MenuStackParamList, 'AgentList'>;

// // ALLIANCE TAB
// export type UnitNavigationProps = CompositeNavigationProp<
//   BottomTabNavigationProp<TabParamsList, 'UnitsTab'>,
//   StackNavigationProp<UnitStackParamList, 'Units'>
// >;
// export type UnitRouteProp = RouteProp<UnitStackParamList, 'Units'>;

// NOTIFICATION TAB
export type BookingsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'BookingTab'>,
  StackNavigationProp<BookingStackParamList, 'Bookings'>
>;
export type BookingsRouteProp = RouteProp<BookingStackParamList, 'Bookings'>;

// Booking portfolio screen
export type BookingPortfolioNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'BookingTab'>,
  StackNavigationProp<BookingStackParamList, 'BookingPortfolio'>
>;
export type BookingPortfolioRouteProp = RouteProp<
  BookingStackParamList,
  'BookingPortfolio'
>;

// Booking portfolio screen
export type BookingDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'BookingTab'>,
  StackNavigationProp<BookingStackParamList, 'BookingDetails'>
>;
export type BookingDetailsRouteProp = RouteProp<
  BookingStackParamList,
  'BookingDetails'
>;

export type CommissionsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'Commissions'>
>;
export type CommissionsRouteProp = RouteProp<MenuStackParamList, 'Commissions'>;

export type CommissionDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'CommissionDetails'>
>;
export type CommissionDetailsRouteProp = RouteProp<
  MenuStackParamList,
  'CommissionDetails'
>;

export type ViewCommissionInvoiceNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'ViewCommissionInvoice'>
>;
export type ViewCommissionInvoiceRouteProp = RouteProp<
  MenuStackParamList,
  'ViewCommissionInvoice'
>;

// MENU TAB
export type MenuNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'Menu'>
>;
export type MenuRouteProp = RouteProp<MenuStackParamList, 'Menu'>;

export type SettingsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'Settings'>
>;
export type SettingsRouteProp = RouteProp<MenuStackParamList, 'Settings'>;

export type CompanyInformationNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'CompanyInformation'>
>;
export type CompanyInformationRouteProp = RouteProp<
  MenuStackParamList,
  'CompanyInformation'
>;

export type EditCompanyInformationNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'EditCompanyInformation'>
>;
export type EditCompanyInformationRouteProp = RouteProp<
  MenuStackParamList,
  'EditCompanyInformation'
>;
export type UploadCompanyDocumentNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'UploadCompanyDocument'>
>;
export type UploadCompanyDocumentRouteProp = RouteProp<
  MenuStackParamList,
  'UploadCompanyDocument'
>;
export type UploadBankDocumentsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'UploadBankDocument'>
>;
export type UploadBankDocumentsRouteProp = RouteProp<
  MenuStackParamList,
  'UploadBankDocument'
>;

export type SignatoryDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'SignatoryDetails'>
>;
export type SignatoryDetailsRouteProp = RouteProp<
  MenuStackParamList,
  'SignatoryDetails'
>;

export type EditSignatoryDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'EditSignatoryDetails'>
>;
export type EditSignatoryDetailsRouteProp = RouteProp<
  MenuStackParamList,
  'EditSignatoryDetails'
>;

export type RequestSubmissionNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'RequestSubmission'>
>;
export type RequestSubmissionRouteProp = RouteProp<
  MenuStackParamList,
  'RequestSubmission'
>;

export type BankDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'BankDetails'>
>;
export type BankDetailsRouteProp = RouteProp<MenuStackParamList, 'BankDetails'>;

export type EditBankDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'EditBankDetails'>
>;
export type EditBankDetailsRouteProp = RouteProp<
  MenuStackParamList,
  'EditBankDetails'
>;

export type DocumentsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'Documents'>
>;
export type DocumentsRouteProp = RouteProp<MenuStackParamList, 'Documents'>;

export type ServiceRequestsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'ServiceRequests'>
>;
export type ServiceRequestsRouteProp = RouteProp<
  MenuStackParamList,
  'ServiceRequests'
>;
export type RaiseComplaintNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'RaiseComplaint'>
>;
export type RaiseComplaintRouteProp = RouteProp<
  MenuStackParamList,
  'RaiseComplaint'
>;

export type ServiceRequestDetailNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'ServiceRequestDetail'>
>;
export type ServiceRequestDetailRouteProp = RouteProp<
  MenuStackParamList,
  'ServiceRequestDetail'
>;

export type MortgageCalculatorNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'MortgageCalculator'>
>;
export type MortgageCalculatorRouteProp = RouteProp<
  MenuStackParamList,
  'MortgageCalculator'
>;

export type AboutUsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'AboutUs'>
>;
export type AboutUsRouteProp = RouteProp<MenuStackParamList, 'AboutUs'>;

export type ContactUsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'ContactUs'>
>;
export type ContactUsRouteProp = RouteProp<MenuStackParamList, 'ContactUs'>;

export type MyInventoryNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'MyInventory'>
>;
export type MyInventoryRouteProp = RouteProp<MenuStackParamList, 'MyInventory'>;

export type InventoryDetailsMenuNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'MenuTab'>,
  StackNavigationProp<MenuStackParamList, 'InventoryDetailsMenu'>
>;
export type InventoryDetailsMenuRouteProp = RouteProp<
  MenuStackParamList,
  'InventoryDetailsMenu'
>;
// // PRODUCT SCREEN
// export type ProductNavigationProps = CompositeNavigationProp<
//   BottomTabNavigationProp<TabParamsList, 'HomeTab' | 'SearchTab'>,
//   StackNavigationProp<HomeStackParamList | SearchStackParamList, 'Product'>
// >;
// export type ProductRouteProp = RouteProp<
//   HomeStackParamList | SearchStackParamList,
//   'Product'
// >;

// // PRODUCTS SCREEN
// export type ProductsNavigationProps = CompositeNavigationProp<
//   BottomTabNavigationProp<TabParamsList, 'HomeTab' | 'SearchTab'>,
//   StackNavigationProp<HomeStackParamList | SearchStackParamList, 'Products'>
// >;
// export type ProductsRouteProp = RouteProp<
//   HomeStackParamList | SearchStackParamList,
//   'Products'
// >;

// AUTH Stacks
export type LoginNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;
export type LoginRouteProp = RouteProp<AuthStackParamList, 'Login'>;

export type CreateNewAccountNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'CreateNewAccount'
>;
export type CreateNewAccountRouteProp = RouteProp<
  AuthStackParamList,
  'CreateNewAccount'
>;

export type LoginWithEmailPasswordNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'LoginWithEmailPassword'
>;
export type LoginWithEmailPasswordRouteProp = RouteProp<
  AuthStackParamList,
  'LoginWithEmailPassword'
>;

export type OtpVerificationNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'OTPVerification'
>;
export type OtpVerificationRouteProp = RouteProp<
  AuthStackParamList,
  'OTPVerification'
>;

export type CreateNewPasswordNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'CreateNewPassword'
>;
export type CreateNewPasswordRouteProp = RouteProp<
  AuthStackParamList,
  'CreateNewPassword'
>;

export type AgentAccountBenefitsNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'AgentAccountBenefits'
>;
export type AgentAccountBenefitsRouteProp = RouteProp<
  AuthStackParamList,
  'AgentAccountBenefits'
>;

export type AgentRegistrationNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'AgentRegistration'
>;
export type AgentRegistrationRouteProp = RouteProp<
  AuthStackParamList,
  'AgentRegistration'
>;

export type CompanyAccountBenefitsNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'CompanyAccountBenefits'
>;
export type CompanyAccountBenefitsRouteProp = RouteProp<
  AuthStackParamList,
  'CompanyAccountBenefits'
>;
export type CompanyRegistrationNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'CompanyRegistration'
>;
export type CompanyRegistrationRouteProp = RouteProp<
  AuthStackParamList,
  'CompanyRegistration'
>;
